// Jquery is Defined globaly... all because of Foundation
var Global = require('../classes/global.js');

(function($){

	// Init Foundation - Declared Afterwards Though Wordpress
	$(document).foundation({
		reveal: {
			animation: 'fade',
			animation_speed: 300,
			close_on_background_click: true,
			close_on_esc: true,
			dismiss_modal_class: 'close-reveal-modal',
			bg_class: 'reveal-modal-bg',
			bg: $('.reveal-modal-bg'),
			css: {
				open: {
					'opacity': 0,
					'visibility': 'visible',
					'display': 'block'
				},
				close: {
					'opacity': 1,
					'visibility': 'hidden',
					'display': 'none'
				}
			}
		}
	});

	// On Document Ready, Get All Posts through an AJAX Request
	$(window).on('load', function(){
		var global = new Global( MyAjax.view.posts, MyAjax.view.pages ); 
    });

})( jQuery );




