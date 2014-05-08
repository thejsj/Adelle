var _        = require('underscore');
var Mustache = require('mustache');
var Backbone = require('backbone');
Backbone.$   = jQuery;

var D3 = require('d3');

var Models = {}; 

(function($){

    Models.Post = Backbone.Model.extend({
        defaults: {
            ID: null, 
            comment_count: "",
            comment_status: "",
            fallback_images: [],
            featured_image: {},
            filter: "raw",
            guid: "",
            menu_order: 0,
            permalink: "",
            ping_status: "",
            pinged: "",
            post_author: "",
            post_content: "",
            post_content_filtered: "",
            post_date: "",
            post_date_gmt: "",
            post_excerpt: "",
            post_mime_type: "",
            post_modified: "",
            post_modified_gmt: "",
            post_name: "",
            post_parent: 0,
            post_password: "",
            post_status: "",
            post_title: "",
            post_type: "",
            template_name: "",
            to_ping: "",
            viewed: false,
            currently_viewing: false,
        },
    });

    Models.Page = Models.Post.extend({
        defaults: $.extend({}, this.defaults, {
            available: true,
        })
    });

    Models.Project = Models.Post.extend({
        defaults: $.extend({}, this.defaults, {
            video_files: [],
            vimeo_id: "",
            video_loaded: false,
            available: false,
        })
    });

    Models.PostCollection = Backbone.Collection.extend({
        model: Models.Page,
        assignColor: function( ){
            var color = D3.scale.category10(); 
            this.forEach(function(project, i){
                project.set('color', color(i) );
            })
        }
    });

    Models.PageCollection = Models.PostCollection;

    Models.ProjectCollection = Models.PostCollection.extend({
        model: Models.Project,
        filterAvailable: function( available_projects_ids ){
            // Get Available Projects
            var available_projects = _.filter( this.models, function( model ){ 
                return ( available_projects_ids.indexOf( model.get('ID') ) > -1 ); 
            });
            // Set As Available
            _.each( available_projects, function( value, key ){
                value.set('available', true);
            });
        },
    });

})(jQuery);

module.exports = Models;