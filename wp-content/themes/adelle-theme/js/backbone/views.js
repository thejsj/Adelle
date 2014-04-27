var _          = require('underscore');
var Mustache   = require('mustache');
var Backbone   = require('backbone');
Backbone.$     = jQuery;

var D3         = require('d3');
var Video      = require('../classes/video-single.js');
var Templates  = require('../templates.js');

var Views = {}; 

(function( $ ){

    // List of Projects in Home Page
    Views.ProjectHome = Backbone.View.extend({
        // Object in which this Model will be rendered
        el: '#project-home-container',
        current_model: null, 
        current_video: null,
        // Template used for this (in index.html). Parsed by undersocre
        initialize: function( project_collection, pages_collection, global ){
            // Tie this view to the allMovies collection
            this._projects  = project_collection;
            this._pages = pages_collection;
            // Keep a copy of the global object
            this.global = global;
            // Render on init
            this.render();
        },
        render: function(){
            // Empty the container (Pure and simple Jquery here)
            this.$el.html('');
            this.projects = {};
            this.pages = {};
            // Render (with underscore) and append (with Jquery) each item in this collction
            this._projects.each(function(project, i){
                // Pass variables to the template throuth the 'movie' variable
                this.projects[ project.get('ID') ] = ( new Views.SingleProject( project, this ) );
            }, this);

            this._pages.each(function(page, i){
                // Pass variables to the template throuth the 'movie' variable
                this.pages[ page.get('ID') ] = ( new Views.SinglePageModal( page, this ) );
            }, this);

            // Get all Widths
            if( !this.global.isOrientationHorizontal() ){
                // Get Width
                var total_width = 0; 
                for( i in this.projects ){
                    total_width += this.projects[i].getWidth(); 
                }
                this.global.setTotalWidth( total_width );
            }
            return this;
        },
        video_quality_heights: {
            'low' : 80,
            'medium' : 160,
            'high' : 240,
        },
        video_quality_widths: {
            'low' : 80,
            'medium' : 160,
            'high' : 240,
        },
        color: D3.scale.category10(), 
        getNewVideoId: function(){
            var i = -1; 
            return function( reset ){
                if( reset === true ){
                    i = -1; 
                    return true; 
                }
                return i += 1;
            }
        },
        reInitAllVideos: function(){
            var self = this; 
            if( typeof self.re_init !== 'undefined' ){
                clearTimeout( self.re_init );
            }
            re_init = setTimeout(function(){
                // Start
                self.projects = [];
                self.render(); 
            }, 500);
        },
        openPage: function( slug ){
            this.current_model = this._pages.findWhere({ 'relational_permalink': slug + '/' })

            // Set Current Video
            this.current_view = this.pages[ this.current_model.get('ID') ];

            this.openModal( this.current_view, this.current_view.$el );

        },
        closePage: function( slug ){
            if( this.current_model !== null && this.current_view !== null ){
                var $current_modal = this.current_view.$el; 
                this.closeModal( $current_modal );
            }
        },
        openProject: function( slug ){

            this.current_model = this._projects.findWhere({ 'relational_permalink': 'project/' + slug + '/' })

            // Set Current Video
            this.current_view = this.projects[ this.current_model.get('ID') ];

            // Set As Viewed
            this.current_view.setAsViewed();

            // Set Related Videos as available
            this.setRelatedAsAvailable( this.current_model.get('ID') );

            this.openModal( this.current_view.modal );
        },
        closeProject: function( ){  
            if( this.current_model !== null && this.current_view !== null ){
                // Remove Vimdeo Video
                this.current_view.modal.removeVideo();          
                var $current_modal = this.current_view.modal.$el; 
                this.closeModal( $current_modal );
            }
        },
        openModal: function( modal_view ) {
            // Freeze Container
            this.global.freezeContainer(); 

            // Set As Viewed
            this.current_model.set('viewed', true);
            this.current_model.set('currently_viewing', true);

            // Open As Model
            modal_view.render(); 

            var $current_modal = modal_view.$el; 
            
            (function(self){
                $current_modal
                    .foundation('reveal', 'open')
                    .find('.close-reveal-modal').click(function(){
                        self.global.router.navigate( '/', true);
                    });
                // Init Slideshow
                if( typeof createJSJGallerySlideshow !== 'undefined'){
                    createJSJGallerySlideshow(); 
                }
            })(this);

            // Update Global
            this.global.update(); 
        },
        closeModal: function( $current_modal ){
            if( this.current_model !== null && this.current_view !== null ){

                if( $current_modal ){
                    $current_modal.foundation('reveal', 'close');
                }
                
                // Unset Variables
                this.current_model.set('currently_viewing', false);
                this.current_model = null;
                this.current_view = null; 

                // UnFreeze Container
                this.global.unFreezeContainer(); 

                // Update Global
                this.global.update(); 
            }
        },
        registerLoadedProject: function( ID ){
            // Set this one
            this._projects.findWhere({ 'ID' : ID }).set('video_loaded', true);
            // See if all are set
            if( this._projects.where({ 'video_loaded' : false }).length == 0){
                this.initVideos();
            }
        },
        initVideos: function(){

            // Change Class On Header
            $("#main-page-title").addClass('active');

            // Init Videos
            var time = {};
            this.$el.addClass('visible');
            var ii = 0; 
            $.each(this.projects, function(i,video){
                time[ ii ] = ii * 700;
                setTimeout(function(){
                    video.initCanvas(); 
                }, time[ ii ]);
                ii++;
            });
        },
        setRelatedAsAvailable: function( current_model_id ){

            var newly_available = _.filter( this._projects.models , function(model){
                if( typeof model !== 'undefined' ){
                    return _.indexOf(model.get('related_projects'), current_model_id) > -1; 
                }
                else {
                    return false; 
                }
            }); 

            var this_model = this._projects.where( { ID : current_model_id } )[0];
            var that = this; 
            _.each(newly_available, function(model){
                // Set as Available
                model.set('available', true);
                // Add To Cookie
                that.global.cookieHandler.addNewProject( model.get('ID') );
            });
        },
    });

    Views.SinglePageModal = Backbone.View.extend({
        template: Templates['single-project'],
        initialize: function( page, parent ){
            this.model = page;   
            this.parent = parent;
        },
        render: function(i){
            this.el = Mustache.render( this.template, this.model.toJSON() ); 
            this.parent.$el.append( this.el );
            this.$el = $("#modal-" + this.model.get('ID'));
            this.$el
                .css('border-color', this.model.get('color'))
                .find('.change-color').css('color', this.model.get('color'));
            this.$el
                .find('.change-bg-color').css('background-color', this.model.get('color'));
            return this; 
        }
    })

    // Single Project In Home Page
    Views.SingleProject = Backbone.View.extend({
        template: Templates['single-project-home'],
        initialize: function( project, parent ){
            this.viewed = false; 
            this.model  = project;   
            this.parent = parent;
            this.modal  = new Views.SingleProjectModal( this.model, this.parent );
            this.render(); 
        },
        events: {
            'click': 'showProject',
        },
        render: function(i){
            this.el = Mustache.render( this.template, this.model.toJSON() ); 
            // Add it to the DOM
            this.parent.$el.append( this.el );
            this.$el = $("#container-" + this.model.get('ID'));
            console.log('New Video');
            this.video = new Video( 
                this.model, 
                this.parent
            );
            return this;
        },
        showProject: function(){
            if( this.model.get('available') ){
                this.parent.global.router.navigate( this.model.get('relational_permalink') , true);
            }
        },
        initCanvas: function(){
            if(this.video !== false){
                this.video.init_canvas(); 
            } 
        },
        setAsViewed: function(){
            this.viewed = true; 
            // Render Video
            (function(modal){
                setTimeout(function(){
                    modal.renderVideo();
                }, 800);
            })(this.modal);
            // Invoke Node Map
        }
    });

    Views.SingleProjectModal = Views.SinglePageModal.extend({
        template: Templates['single-project'],
        video_template: Templates['vimeo-video'],
        renderVideo: function(){
            this.$el
                .find('.main-video')
                .html( Mustache.render( this.video_template, this.model.toJSON() ));
            alert($(document).width());
        },
        removeVideo: function(){
            this.$el
                .find('.main-video')
                .html( '' );
        },
    });


})( jQuery );

module.exports = Views;