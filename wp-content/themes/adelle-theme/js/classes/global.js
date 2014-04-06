var _        = require('underscore');
var Backbone = require('backbone');
Backbone.$   = jQuery;

var Router  = require('../backbone/router.js');
var Models  = require('../backbone/models.js');
var Views   = require('../backbone/views.js');

var Options = require('../classes/options-handler.js');
var ScrollHandler = require('../classes/scroll-handler.js');
var CookieHandler = require('../classes/cookie-handler.js');

var Global = {};

(function($){

	/**
	 * Description
	 * @param {} callback
	 * @return self
	 */
	Global = function( projects_array ){

		var self = {}, __self = {};

		/**
		 * Init the global object
		 * @method init
		 * @return this
		 */
		self.init = function(){

			// Settings
			__self.window_height = $(window).height();
	        __self.window_width  = $(window).width();
	        
	        // Get Options
	        self.options = new Options( self );
	        __self.fallback_view = !Modernizr.video; 
	        __self.orientation   = self.options.get( 'orientation' );

	        // Elements
	        self.$body             = $('body');
	        self.$videos_container = $("#videos-container");

	        // Manipulate DOM
	        self.$body.addClass( 'projects-orientation-' + __self.orientation );

	        // Bind Scrolling
	        __self.bindScrolling(); 

			// Bind Debugging and Pausing
			__self.bindDebugging(); 

			// Init Projects
			__self.projects = new Models.ProjectCollection( projects_array );
			__self.projects.assignColor(); 

			// Init Cookie Handler (Pass all IDs)
			self.cookieHandler = new CookieHandler( 
				__self.getAllProjectIds( __self.projects ), 
				__self.projects,
				self.options 
			);

			// Filter Availble Projects
			__self.projects.filterAvailable( self.cookieHandler.getAvailableProjects() ); 

			self.router = {}; 

			// Create Home View
			__self.home_view = new Views.ProjectHome( __self.projects, self ); 

			// Init Router
			self.router = new Router( __self.home_view );
		    Backbone.history.start({ pushState: Modernizr.history });  // URLs don't work without this

			// Init Scroll Handler
			self.scroll_handler = new ScrollHandler( self );

			return self; 
		}

		self.reInit = function(){
			// Empty Video Container
			self.$videos_container.html(''); 

	        __self.orientation   = self.options.get( 'orientation' );
	        __self.setOrientationClass(); 

			self.options.reInit(); 	
			__self.home_view.reInitAllVideos(); 
			self.scroll_handler.reInit(); 
		}

		/**
		 * Set the global with variable and update the width of the video container object with jQuery
		 *
		 * @method setTotalWidth
		 * @param Number new_width
		 * @return this
		 */
		self.setTotalWidth = function( new_width ){
			__self.total_width = new_width;
			self.$videos_container.width( __self.total_width ); 
			return self; 
		}

		/**
		 * Add a class to 'body' based on our orientation
		 *
		 * @return this
		 */
		__self.setOrientationClass = function(){
			var all_classes = self.$body.get(0).className.split(" "); 
			for( i in all_classes ){
				if( all_classes[i].indexOf( 'orientation' ) > -1){
					self.$body.removeClass( all_classes[i] );
				}
			}
			self.$body.addClass( 'projects-orientation-' + __self.orientation );
			return self; 
		}

		/** 
		 * Bind Scrolling to a global 'dragging' variable, to be used in mobile
		 * This prevents touchmove from being misinterpreted as touchend
		 * 
		 * @return this
		 */
		__self.bindScrolling = function(){
			// Bind Scrolling
	        __self.dragging = false;

	        $("body").on("touchmove", function(){
				__self.dragging = true;
			});

			$("body").on("touchend", function(event){
				if( __self.dragging ){
					event.preventDefault();
					event.stopPropagation(); 
	          		return false;
				}
			});

			$("body").on("touchstart", function(){
				__self.dragging = false;
			});
			return self; 
		}

		/**
		 * Bind Certain Keys for Debugging
		 *
		 * @return this
		 */
		__self.bindDebugging = function(){
			__self.debug_mode = true; 
			__self.paused     = false; 

			$(document).keypress(function(event){
				if( event.keyCode === 43 ){
					console.clear();
					__self.debug_mode = !__self.debug_mode;
					console.log( 'debug_mode : ' + __self.debug_mode );
				}
				else if( event.keyCode === 13 ){
				    __self.paused = !__self.paused; 
				    console.log( 'Pasued : ' + __self.paused );
				}else if( event.keyCode === 100 ){
				    self.cookieHandler.deleteCookie(); 
				    console.log( 'Available Deleted ' );
				}
				else {
				    console.log( event.keyCode );
				}
			});
			return self; 
		};

		/**
		 * Go through a list of projects and get their ids
		 *
		 * @return Array
		 */
		__self.getAllProjectIds = function( collection ){
			var all_project_ids = []; 
			collection.forEach(function(model){
				all_project_ids.push( model.get('ID') );
			})
			return all_project_ids;
		}

		/* * * * * * * * * * * * * *
		 *                         *
		 *         Getters         * 
		 *                         *
		 * * * * * * * * * * * * * */

		/**
		 * Description
		 * @method getOrientation
		 * @return MemberExpression
		 */
		self.get = function( option_name ){
			return __self[ option_name ]; 
		}

		/**
		 * Description
		 * @method isOrientationHorizontal
		 * @return ConditionalExpression
		 */
		self.isOrientationHorizontal = function(){
			return ( __self.orientation === 'horizontal' ? true : false )
		}

		/**
		 * Description
		 * @method isOrientationVertical
		 * @return ConditionalExpression
		 */
		self.isOrientationVertical = function(){
			return ( __self.orientation === 'vertical' ? true : false )
		}

		self.init(); 
		return self; 
	}
	
})(window.jQuery);

module.exports = Global;