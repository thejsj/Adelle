var D3 = require('d3');

var MainTitleHandler; 

(function($){

	MainTitleHandler = function(){

		var self = {}, __self = {}; 

		self.init = function(){
			__self.color = D3.scale.category10();
			__self.index = 0; 
			__self.$main_page_title           = $("#main-page-title");
			__self.$main_page_title_h1        = __self.$main_page_title.find("#main-page-title-link");
			__self.$main_page_title_paragraph = __self.$main_page_title.find("#main-page-title-secondary-text");

			__self.title_length = __self.breakIntoSpans(); 

			__self.$main_page_title
				.addClass('spanned')
				.hover( __self.onHover, __self.offHover );

			console.log('Paragraph!!!!');

			console.log( __self.$main_page_title_paragraph );

			__self.$main_page_title_paragraph
				.slideUp( 2000, function(){
					$(this).remove();
				});
		}

		__self.onHover = function(){
			if( __self.$main_page_title_h1.hasClass('spanned') ){
				// Animate
				__self.animation_interval = setInterval(function(){
					// Animate Letters
					__self.$main_page_title_h1.find(".letter").each(function(i){
						var current_color = __self.color( (i + __self.index) % __self.title_length ); 
						if(i === 0){
							__self.$main_page_title_h1
								.css('border-bottom-color', current_color);
						}
						$(this)
							.css('color', current_color );
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

		__self.offHover = function(){
			clearInterval( __self.animation_interval );
			__self.$main_page_title_h1
				.css('border-bottom-color', "#fff")
				.find(".letter").each(function(i){
					$(this)
						.css('color', "#fff" );
				})
		}

		__self.breakIntoSpans = function(){
			var letters = __self.$main_page_title_h1.text();
			var letters = letters.split('');
			for(var i = 0; i < letters.length; i++){
				letters[i] = "<span class='letter letter-" + i + "'>" + letters[i] + "</span>";
			}
			var length = letters.length;
			__self.$main_page_title_h1.html( letters.join('') );
			return length;
		}

		self.init(); 
		return self; 
	}


})(window.jQuery);

module.exports = MainTitleHandler;