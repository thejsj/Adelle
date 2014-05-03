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
	$(document).ready(function(){
		// Get Posts
        $.post(	
		    MyAjax.ajaxurl,
			{
				action : 'get-projects', // This is the name of your PHP function in functions.php
			},
			function( data ) {
				// With the data response, create the global object
				console.log(data.posts);
				var global = new Global( data.posts, data.pages ); 
			}
		);
    });

})( jQuery );




