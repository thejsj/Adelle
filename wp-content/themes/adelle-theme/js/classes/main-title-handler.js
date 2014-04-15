var D3 = require('d3');

var MainTitleHandler; 

(function($){

	MainTitleHandler = function(){

		var self = {}, __self = {}; 

		self.init = function(){

			__self.color = D3.scale.category10();
			__self.index = 0; 
			__self.$main_page_title = $("#main-page-title");

			__self.title_length = __self.breakIntoSpans(); 

			__self.$main_page_title
				.addClass('spanned')
				.hover( __self.hoverOn, __self.hoverOff );
		}

		__self.hoverOn = function(){
			if( __self.$main_page_title.hasClass('active') ){
				// Animate
				__self.animation_interval = setInterval(function(){
					// Animate Letters
					__self.$main_page_title.find(".letter").each(function(i){
						$(this)
							.css('color', __self.color( (i + __self.index) % __self.title_length ) );
					})
					// Update Index
					__self.index += 1
					__self.index = Math.min( __self.index , __self.title_length );
					if( __self.index === __self.title_length ){
						__self.index = 0; 
					}
				}, 50);
			}
		}

		__self.hoverOff = function(){
			clearInterval( __self.animation_interval );
			__self.$main_page_title.find(".letter").each(function(i){
				$(this)
					.css('color', "#fff" );
			})
		}

		__self.breakIntoSpans = function(){
			var letters = __self.$main_page_title.text();
			var letters = letters.split('');
			for(var i = 0; i < letters.length; i++){
				letters[i] = "<span class='letter letter-" + i + "'>" + letters[i] + "</span>";
			}
			var length = letters.length;
			__self.$main_page_title.html( letters.join('') );
			return length;
		}

		self.init(); 
		return self; 
	}


})(window.jQuery);

module.exports = MainTitleHandler;