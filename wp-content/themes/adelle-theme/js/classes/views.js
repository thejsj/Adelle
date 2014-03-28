var $          = require('jquery');
var _          = require('underscore');
var Mustache   = require('mustache');
var Backbone   = require('backbone');
Backbone.$     = $;
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
            this.videos = [];
            // Render (with underscore) and append (with Jquery) each item in this collction
            this.coll.each(function(project, i){
                // Pass variables to the template throuth the 'movie' variable
                this.videos.push( new Views.SingleProjectVideo( project, this ) );
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
        }
    });

    // Single Project In Home Page
    Views.SingleProjectVideo = Backbone.View.extend({
        template: Templates['single-project-home'],
        initialize: function( project, parent ){
            this.model = project;   
            this.parent = parent;
            this.render(); 
        },
        render: function(i){
            this.el = Mustache.render( this.template, this.model.toJSON() ); 
            // Add it to the DOM
            this.parent.$el.append( this.el );
            this.$el = $("#container-" + this.model.get('ID'));
            this.video = new Video( 
                this.model.get('ID'), 
                this.model.get('video_files'), 
                this.model.get('fallback_images'), 
                this.parent
            );
            return this;
        },
    });



})( jQuery );

module.exports = Views;