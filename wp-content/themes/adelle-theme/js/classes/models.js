var _        = require('underscore');
var Mustache = require('mustache');
var Backbone = require('backbone');
Backbone.$   = jQuery;

var Models = {}; 

(function($){

    Models.Project = Backbone.Model.extend({
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
            video_files: [],
            vimeo_id: "",
        },
        initialize :  function(){
            // Try to get id here...
        }
    });

    Models.ProjectCollection = Backbone.Collection.extend({
        model: Models.Project,
    });

})(jQuery);

module.exports = Models;