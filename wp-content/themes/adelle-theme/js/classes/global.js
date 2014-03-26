var Options = require('../classes/options.js');
var Models  = require('../classes/models.js');
var Views   = require('../classes/views.js');
var VideoHandler = require('../classes/video-handler.js');
var ScrollHandler = require('../classes/scroll-handler.js');

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
	        __self.fallback_view = self.options.get( 'fallback_view' );
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

	        // Get Fallback Images
	  //       $.getJSON( "js/data/fallback-images.json", function( data ) {
	  //       	
	  //       	if( typeof callback !== 'undefined' ){
	  //       		callback( self ); 
	  //       	}
			// });
			__self.projects = new Models.ProjectCollection( projects_array );
			// console.log( 'Projects' );
			// console.log( projects_array );
			// console.log( __self.projects );

			// __self.projects.each(function( project, id ){
			// 	console.log( project.get('post_title') )
			// 	console.log( id )
			// });

			// Create Home View
			__self.home_view = new Views.ProjectHome( __self.projects ); 

			// self.fallback_images = data;
			// self.video_handler = new VideoHandler( global ); 

			// Init Scroll Handler
			self.scroll_handler = new ScrollHandler( global );

			return self; 
		}

		self.reInit = function(){
			// Empty Video Container
			self.$videos_container.html(''); 

			__self.fallback_view = self.options.get( 'fallback_view' );
	        __self.orientation   = self.options.get( 'orientation' );
	        __self.setOrientationClass(); 

			self.options.reInit(); 	
			self.video_handler.reInit(); 
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
			__self.debug_mode = false; 
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
				}
				else {
				    console.log( event.keyCode );
				}
			});
			return self; 
		};

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