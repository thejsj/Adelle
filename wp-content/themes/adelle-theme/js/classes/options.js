var dat = require('dat-gui');

var Options = {};

(function($){
	
	Options = function( global ){

		var self = {}, __self = {}; 

		__self.global_options = {};

		/**
         * Description
         * @method options
         * @return that
         */
        __self.initOptions = function() {
            __self.global_options.background_color = [ 255, 255, 255 ];
            __self.global_options.video_background_color = [ 255, 255, 255 ];
            // View Options
            __self.global_options.orientation = 'horizontal';
            __self.global_options.start_on_init = 10;
            // Video Options
            __self.global_options.speed = 400;
            __self.global_options.video_quality = 'high';
            // Available 
            __self.global_options.canvas_opacity = 1;
            __self.global_options.video_opacity = 0.67;
            __self.global_options.video_background_color_alpha = 0.0249;
            // Unavailable 
            __self.global_options.canvas_opacity_unavailable = 0.18;
            __self.global_options.video_opacity_unavailable = 0.04;
            __self.global_options.video_background_color_alpha_unavailable = 0.0672;
        };

        __self.initGui = function(){
        	var gui = new dat.GUI();
		    var v1 = [], v2 = [], v3 = [];

		    var v1f = gui.addFolder('Video_Options');
		    v1[v1.length] = gui.add( __self.global_options , 'speed', 0, 1000);
		    v1[v1.length] = gui.add( __self.global_options , 'video_quality', ['low', 'medium', 'high']);
		    v1[v1.length] = gui.add( __self.global_options , 'orientation', ['horizontal', 'vertical' ] );

		    var v2f = gui.addFolder('Available_Video_Options');
		    v2[v2.length] = gui.add( __self.global_options , 'canvas_opacity', 0, 1 );
		    v2[v2.length] = gui.add( __self.global_options , 'video_opacity', 0, 1 );
		    v2[v2.length] = gui.add( __self.global_options , 'video_background_color_alpha', 0, 0.1  );

		    var v3f = gui.addFolder('Unavailable_Video_Options');
		    v3[v3.length] = gui.add( __self.global_options , 'canvas_opacity_unavailable', 0, 1 );   
		    v3[v3.length] = gui.add( __self.global_options , 'video_opacity_unavailable', 0, 1 ); 
		    v3[v3.length] = gui.add( __self.global_options , 'video_background_color_alpha_unavailable', 0, 0.1  );
		    
		    v1[1].onChange(function(value) {
		            global.reInit();
	        });
	        v1[2].onChange(function(value) {
	            global.reInit();
	        });
	        v2[0].onChange(function(value) {
	            $("canvas.available-true").css('opacity', __self.global_options.canvas_opacity );
	        });
	        v3[0].onChange(function(value) {
	            $("canvas.available-false").css('opacity', __self.global_options.canvas_opacity_unavailable );
	        });
		}

		self.init = function(){
			__self.initOptions();
			if( global.get('window_width') > 500 ){
				__self.initGui();
			}
			
		}

		self.reInit = function(){
			// Nothing
		}

		self.get = function( option_key ){
        	return __self.global_options[ option_key ];
        }

	    self.init(); 
	    return self; 
    }
})(window.jQuery);

module.exports = Options;