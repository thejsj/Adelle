var jQuery = require('jquery');

(function($){

	// Get Dependencies
	var Global = require('../classes/global.js');

	// On Document Ready, Get All Posts through an AJAX Request
	$(document).ready(function(){
        $.post(	
		    MyAjax.ajaxurl,
			{
				action : 'get-projects', // This is the name of your PHP function in functions.php
			},
			function( data ) {
				console.log( data );
				// With the data response, create the global object
				var global = new Global( data.posts ); 
			}
		);
    });

})( jQuery );




