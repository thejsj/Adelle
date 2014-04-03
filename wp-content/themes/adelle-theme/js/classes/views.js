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
        // Template used for this (in index.html). Parsed by undersocre
        initialize: function( project_collection, global ){
            // Tie this view to the allMovies collection
            this.coll = project_collection;
            // Keep a copy of the global object
            this.global = global;
            // Render on init
            this.render();
        },
        render: function(){
            // Empty the container (Pure and simple Jquery here)
            this.$el.html('');
            this.videos = {};
            // Render (with underscore) and append (with Jquery) each item in this collction
            this.coll.each(function(project, i){
                // Pass variables to the template throuth the 'movie' variable
                this.videos[ project.get('ID') ] = ( new Views.SingleProjectVideo( project, this ) );
            }, this);
            // Get all Widths
            if( !this.global.isOrientationHorizontal() ){
                // Get Width
                var total_width = 0; 
                for( i in this.videos ){
                    total_width += this.videos[i].getWidth(); 
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
                self.videos = [];
                self.render(); 
            }, 500);
        },
        openModal: function( slug ){
            var current_model_id = this.coll.findWhere({ 'relational_permalink': 'project/' + slug + '/' }).get('ID');
            this.current_video    = this.videos[ current_model_id ];

            // Set As Viewed
            this.current_video.setAsViewed();

            // Set Related Videos as available
            this.setRelatedAsAvailable( current_model_id );

            // Open As Model
            var $current_modal = this.current_video.modal.$el; 
            (function(self){
                $current_modal
                    .foundation('reveal', 'open')
                    .find('.close-reveal-modal').click(function(){
                        self.global.router.navigate( '/', true);
                    });
            })(this);
        },
        closeModal: function( ){
            // Remove Vimdeo Video
            if( this.current_video ){
                this.current_video.modal.removeVideo(); 
                // Close Modal
                var $current_modal = this.current_video.modal.$el; 
                if( $current_modal ){
                    $current_modal.foundation('reveal', 'close');
                    $current_modal = null; 
                }
            }
        },
        registerLoadedProject: function( ID ){
            // Set this one
            this.coll.findWhere({ 'ID' : ID }).set('video_loaded', true);
            // See if all are set
            if( this.coll.where({ 'video_loaded' : false }).length == 0){
                this.initVideos();
            }
        },
        initVideos: function(){
            var time = {};
            this.$el.addClass('visible');
            var ii = 0; 
            $.each(this.videos, function(i,video){
                time[ ii ] = ii * 700;
                setTimeout(function(){
                    video.initCanvas(); 
                }, time[ ii ]);
                ii++;
            });
        },
        setRelatedAsAvailable: function( current_model_id ){
            var newly_available = _.filter( this.coll.models , function(model){
                if( typeof model !== 'undefined' ){
                    return _.indexOf(model.get('related_projects'), current_model_id) > -1; 
                }
                else {
                    return false; 
                }
            }); 
            _.each(newly_available, function(model){
                console.log( 'New: ' + model.get('post_title') );
                model.set('available', true);
            });
        },
    });

    // Single Project In Home Page
    Views.SingleProjectVideo = Backbone.View.extend({
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
            this.video.init_canvas(); 
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

    Views.SingleProjectModal = Backbone.View.extend({
        template: Templates['single-project'],
        video_template: Templates['vimeo-video'],
        initialize: function( project, parent ){
            this.model = project;   
            this.parent = parent;
            this.color = this.parent.color( this.model.get('ID') );
            this.render(); 
        },
        render: function(i){
            this.el = Mustache.render( this.template, this.model.toJSON() ); 
            this.parent.$el.append( this.el );
            this.$el = $("#modal-" + this.model.get('ID'));
            this.$el
                .css('border-color', this.color)
                .find('.change-color').css('color', this.color);
            this.$el
                .find('.change-bg-color').css('background-color', this.color);
            return this; 
        },
        renderVideo: function(){
            this.$el
                .find('.main-video')
                .html( Mustache.render( this.video_template, this.model.toJSON() ));
        },
        removeVideo: function(){
            this.$el
                .find('.main-video')
                .html( '' );
        },
    })


})( jQuery );

module.exports = Views;