var Global;

(function($){

	/**
	 * Description
	 * @param {} callback
	 * @return self
	 */
	Global = function( callback ){

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

	        // Get Fallback Images
	        $.getJSON( "js/data/fallback-images.json", function( data ) {
	        	self.fallback_images = data;
	        	if( typeof callback !== 'undefined' ){
	        		callback( self ); 
	        	}
			});
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
		 * @method setTotalWidth
		 * @param Number new_width
		 * @return this
		 */
		self.setTotalWidth = function( new_width ){
			__self.total_width = new_width;
			self.$videos_container.width( __self.total_width ); 
		}

		__self.setOrientationClass = function(){
			var all_classes = self.$body.get(0).className.split(" "); 
			for( i in all_classes ){
				if( all_classes[i].indexOf( 'orientation' ) > -1){
					self.$body.removeClass( all_classes[i] );
				}
			}
			self.$body.addClass( 'projects-orientation-' + __self.orientation );
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

		self.init( callback ); 
		return self; 

	}
	
})(window.jQuery);