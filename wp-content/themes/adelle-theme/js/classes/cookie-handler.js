var NodeMap = require('../classes/nodemap-handler.js');

var CookieHandler = {}; 

(function($){

	CookieHandler = function( all_project_ids, projects, node_map_options ){

		var self = {}, __self = {}; 

		self.init = function( all_project_ids, projects, node_map_options ){			

			__self.cookie_name = "AdelleLinSiteAvailableProjects";
			__self.cookie_value = $.cookie( __self.cookie_name); 

			if( typeof __self.cookie_value !== 'undefined' && __self.cookie_value !== "" ){
				// Get Saved Projects
				__self.availableProjects = __self.cookie_value.split(',');
				for( var i = 0; i < __self.availableProjects.length; i++ ){
					__self.availableProjects[i] = Number(__self.availableProjects[i]);
				}
			}
			else {
				// Generate New Project ID
				__self.randomlySortArray( all_project_ids );
				__self.availableProjects = [ all_project_ids[0], all_project_ids[1], all_project_ids[2] ];
			}
			$.cookie( __self.cookie_name , __self.availableProjects.join(','), { expires: 30, path: '/' });

			setTimeout(function(){
				__self.node_map = new NodeMap(projects, node_map_options); 
			});
		}

		self.getAvailableProjects = function(){
			return __self.availableProjects; 
		}

		self.addNewProject = function( project_id ){
			__self.availableProjects.push( project_id );
			$.cookie( __self.cookie_name, __self.availableProjects, { expires: 30, path: '/' });
			if( typeof __self.node_map !== 'undefined' ){
				__self.node_map.addNode( project_id );
			}
		}

		self.deleteCookie = function(){
			$.removeCookie( __self.cookie_name , { path: '/' });
		}

		self.update = function(){
			if( typeof __self.node_map !== 'undefined'){
				__self.node_map.update(); 
			}
		}

		__self.randomlySortArray = function( array ){
			for (var tmp, cur, top=array.length; top--;){
				cur = (Math.random() * (top + 1)) << 0;
				tmp = array[cur]; array[cur] = array[top]; array[top] = tmp;
			}
			return array;
		}

		self.init( all_project_ids, projects, node_map_options ); 
		return self; 
	}

})(jQuery);

module.exports = CookieHandler;