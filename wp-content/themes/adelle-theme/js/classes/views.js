var $          = require('jquery');
var _          = require('underscore');
var Mustache   = require('mustache');
var Backbone   = require('backbone');
Backbone.$ = $;
var Templates  = require('../templates.js');


var Views = {}; 

(function( $ ){

    // List of Projects in Home Page
    Views.ProjectHome = Backbone.View.extend({
        // Object in which this Model will be rendered
        el: '#project-home-container',
        // Template used for this (in index.html). Parsed by undersocre
        initialize: function( project_collection ){
            // Tie this view to the allMovies collection
            this.coll = project_collection;
            // Render on init
            this.render();
        },
        render: function(){
            // Empty the container (Pure and simple Jquery here)
            this.$el.html('');
            // Render (with underscore) and append (with Jquery) each item in this collction
            this.coll.each(function(project, i){
                // Pass variables to the template throuth the 'movie' variable
                var single_project = new Views.SingleProjectVideo( project );
                // Add it to the DOM
                this.$el.append( single_project.render().el );
            }, this);
            return this;
        }
    });

    // Single Project In Home Page
    Views.SingleProjectVideo = Backbone.View.extend({
        template: Templates['single-project-home'],
        initialize: function( project ){
            this.model = project;
            this.render(); 
        },
        render: function(i){
            this.el = Mustache.render( this.template, this.model.toJSON() ); 
            return this;
        },
    });



})( jQuery );

module.exports = Views;