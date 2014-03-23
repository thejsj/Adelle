var ScrollHandler; 

(function($){

	/**
	 * Description
	 * @param {} global
	 * @return self
	 */
	ScrollHandler = function( global ){

		var self = {}, __self = {}; 

		/**
		 * Description
		 * @method init
		 * @return 
		 */
		self.init = function(){
			
			__self.wheel_delta = 0; 

			$(window).on({
				'DOMMouseScroll mousewheel': self.scrollUpdate
			});
		}

		self.reInit = function(){
			// Nothing
		}

		/**
		 * Description
		 * @method scrollUpdate
		 * @param {} event
		 * @return 
		 */
		self.scrollUpdate = function( event ){
			if( global.get('orientation') === 'vertical' ){
				__self.wheel_delta += event.originalEvent.wheelDelta;
				if( __self.wheel_delta >= 0 ){
					__self.wheel_delta = 0;
				}
				var maximum = - ( global.get( 'total_width' ) - global.get( 'window_width' ) );

				if( __self.wheel_delta <= maximum ){
					__self.wheel_delta = maximum;
				}
				global.$videos_container
					.animate({
						'left':  __self.wheel_delta
					}, 50);
			}
		}
		self.init(); 
		return self;
	}

})(window.jQuery);
