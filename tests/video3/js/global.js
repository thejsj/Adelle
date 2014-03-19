var Global;

(function($){

	Global = function(){

		var self = {}, __self = {};

		self.init = function(){

			__self.window_height = $(window).height();
	        __self.window_width  = $(window).width();
	        self.$videos_container = $("#videos-container");

		}

		self.setTotalWidth = function( new_width ){
			__self.total_width = new_width;
			self.$videos_container.width( __self.total_width ); 
		}

		/* 
		 * Getters
		 */

		self.getWindowHeight = function(){
			return __self.window_height;
		}

		self.getWindowWidth = function(){
			return __self.window_width;
		}

		self.getTotalWidth = function(){
			return __self.total_width;
		}

		self.init(); 
		return self; 

	}
	
})(window.jQuery);