var jQuery     = require('jquery');
var _          = require('underscore');
var Backbone   = require('backbone');
var Mustache   = require('mustache');


(function($){

	var Global = require('../classes/global.js');
	var VideoHandler = require('../classes/video-handler.js');
	var ScrollHandler = require('../classes/scroll-handler.js');

	$(document).ready(function(){
        $.post(	
		    MyAjax.ajaxurl,
			{
				action : 'get-projects', // This is the name of your PHP function in functions.php
			},
			function( data ) {
				console.log( data );
				var global = new Global(data, function( self ){
					// Init Videos and Scroll Handler
					self.video_handler = new VideoHandler( global ); 
					self.scroll_handler = new ScrollHandler( global );
				}); 
			}
		);
    });

})(window.jQuery);




