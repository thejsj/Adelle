var Backbone = require('backbone');
Backbone.$   = jQuery;

var Router = {}; 

(function($){

    Router = Backbone.Router.extend({
        routes : {
            "project/:slug/" : "project",
            ".*"   : "notFound",
            '*path': 'home', // Our last resort, go home
        },
        initialize: function( home_view ){
            this.home_view = home_view; 
        },
        project : function(slug){
            this.home_view.openModal( slug );
        },
        home : function() {
            this.home_view.closeModal();
        },
        notFound : function(){
            console.log( 'Not Found' );
        },
    });

})(jQuery);

module.exports = Router;