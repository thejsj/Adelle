var Backbone = require('backbone');
Backbone.$   = jQuery;

var Router = {}; 

(function($){

    Router = Backbone.Router.extend({
        current_view: null,
        routes : {
            "project/:slug/" : "project",
            ":slug/"   : "page",
            '*path': 'home', // Our last resort, go home
        },
        initialize: function( home_view ){
            this.home_view = home_view; 
            this.current_view = 'home';
        },
        project : function(slug){
            console.log(' + R + open Project : ' + slug);
            this.closeModals(); 
            this.home_view.openProject( slug );
            this.current_view = 'project';
        },
        page: function(slug){
            console.log(' + R + open Page : ' + slug);
            this.closeModals(); 
            this.home_view.openPage( slug );
            this.current_view = 'page';
        },
        home : function() {
            console.log(' + R + Home ');
            this.closeModals(); 
            this.current_view = 'home';
        },
        notFound : function(){
            console.log(' + R + Not Found : ' + slug);
            this.closeModals(); 
        },
        closeModals : function(){
            if(this.current_view === 'page'){
                this.home_view.closePage();
            }
            if(this.current_view === 'project'){
                this.home_view.closeProject();
            }
        }
    });

})(jQuery);

module.exports = Router;