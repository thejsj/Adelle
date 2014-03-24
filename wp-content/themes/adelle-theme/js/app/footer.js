(function($){

	var _          = require('underscore');
	var Backbone   = require('backbone');
	var Mustache   = require('mustache');

	$.post(
	    MyAjax.ajaxurl,
	    {
	        action : 'get-projects', // This is the name of your PHP function in functions.php
	    },
	    function( response ) {
	        console.log(response);
	    }
	);

})(window.jQuery);




