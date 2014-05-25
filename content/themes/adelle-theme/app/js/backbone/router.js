var Backbone = require('backbone');
Backbone.$   = jQuery;

var Router = {}; 

(function($){

    Router = function( ){

        var self = {}, __self = {};

        self.current_view = null;

        self.routes = {
            "project/:slug/" : "project",
            ":slug/"   : "page",
            '*path': 'home', // Our last resort, go home
        }

        self.initialize = function( home_view ){
            self.home_view = home_view; 
            self.current_view = 'home';
        }

        self.project = function(slug){
            self.closeModals(function(){
                self.home_view.openProject( slug );
                self.current_view = 'project';
                if(typeof ga !== 'undefined'){
                    ga('send', 'pageview', document.URL);
                }
            });
        }

        self.page = function(slug){
            self.closeModals(function(){
                self.home_view.openPage( slug );
                self.current_view = 'page';
                if(typeof ga !== 'undefined'){
                    ga('send', 'pageview', document.URL);
                }
            });    
        }

        self.home = function() {
            self.closeModals(function(){
                self.current_view = 'home';
                if(typeof ga !== 'undefined'){
                    ga('send', 'pageview', document.URL);
                }
            }); 
        }

        self.notFound = function(){
            self.closeModals(); 
        }

        self.closeModals = function(callback){
            if(self.current_view === 'page'){
                setTimeout(function(){
                    self.home_view.closePage(callback);
                });
            }
            else if(self.current_view === 'project'){
                setTimeout(function(){
                    self.home_view.closeProject(callback);
                });
            }
            else {
                callback();
            }
        }
        return self; 
    }

    Router = Backbone.Router.extend( Router() );

})(jQuery);

module.exports = Router;