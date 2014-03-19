var ScrollHandler; 

(function($){

	ScrollHandler = function( global ){

		var self = {}, __self = {}; 

		self.init = function(){
			
			__self.wheel_delta = 0; 
			__self.$video_container = $("#videos-container"); 

			$(window).on({
				'DOMMouseScroll mousewheel': self.scrollUpdate
			});
		}

		self.scrollUpdate = function( event ){

			__self.wheel_delta += event.originalEvent.wheelDelta;

			if( __self.wheel_delta >= 0 ){
				__self.wheel_delta = 0;
			}

			var maximum = - ( global.getTotalWidth() - global.getWindowWidth() );
			if( __self.wheel_delta <= maximum ){
				__self.wheel_delta = maximum;
			}

			__self.$video_container
				.animate({
					'left':  __self.wheel_delta
				}, 50);

			
		}
		self.init(); 
		return self;
	}

})(window.jQuery);
