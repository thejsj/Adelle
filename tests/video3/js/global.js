var Global;

(function($){

	Global = function( callback ){

		var self = {}, __self = {};

		self.init = function(){

			__self.window_height = $(window).height();
	        __self.window_width  = $(window).width();
	        __self.fallback_view = true;

	        self.$videos_container = $("#videos-container");

	        $.getJSON( "js/fallback-images.json", function( data ) {
	        	self.fallback_images = data;
	        	console.log( self.fallback_images );
	        	if( typeof callback !== 'undefined' ){
	        		callback(); 
	        	}
			});
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

		self.getIfFallback = function(){
			return __self.fallback_view; 
		}

		self.init( callback ); 
		return self; 

	}
	
})(window.jQuery);