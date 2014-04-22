var Backbone = require('backbone');
Backbone.$   = jQuery;

var Router = {}; 

(function($){

    Router = Backbone.Router.extend({
        routes : {
            "project/:slug/" : "project",
            "adelle-lin/"   : "page",
            "about/"   : "page",
            '*path': 'home', // Our last resort, go home
        },
        initialize: function( home_view ){
            this.home_view = home_view; 
        },
        project : function(slug){
            this.home_view.openModal( slug );
        },
        page: function(slug){
            this.home_view.openModal( slug );
        },
        home : function() {
            console.log( 'Home' );
            this.home_view.closeModal();
        },
        notFound : function(){
            this.home_view.closeModal();
            console.log( 'Not Found' );
        },
    });

})(jQuery);

module.exports = Router;