var Options; 

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
            __self.global_options.video_background_color_alpha = 0.009;
            __self.global_options.speed = 40;
            __self.global_options.start_on_init = 10;
            __self.global_options.video_quality = 'high';
            __self.global_options.canvas_opacity = 1;
            __self.global_options.video_opacity = 0.2;
            __self.global_options.orientation = 'horizontal';
            __self.global_options.fallback_view = true;
        };

        __self.initGui = function(){
        	var gui = new dat.GUI();
		    var c = [];
		    c[c.length] = gui.addColor( __self.global_options , 'background_color');
		    c[c.length] = gui.addColor( __self.global_options , 'video_background_color');
		    c[c.length] = gui.add( __self.global_options , 'video_background_color_alpha', 0, 0.1 );
		    c[c.length] = gui.add( __self.global_options , 'speed', 0, 1000);
		    c[c.length] = gui.add( __self.global_options , 'start_on_init', 0, 10).step(1);
		    c[c.length] = gui.add( __self.global_options , 'video_quality', ['low', 'medium', 'high']);
		    c[c.length] = gui.add( __self.global_options , 'canvas_opacity', 0, 1 );
		    c[c.length] = gui.add( __self.global_options , 'video_opacity', 0, 1 );
		    c[c.length] = gui.add( __self.global_options , 'orientation', ['horizontal', 'vertical' ] );
		    c[c.length] = gui.add( __self.global_options , 'fallback_view' );
		    for(i in c){
		        c[0].onChange(function(value) {
		            $("body")
		                .css("background", __self.global_options.background_color);
		        });
		        c[4].onChange(function(value) {
		            global.reInit();
		        });
		        c[5].onChange(function(value) {
		            global.reInit();
		        });
		        c[6].onChange(function(value) {
		            $("canvas").css('opacity', __self.global_options.canvas_opacity);
		        });
		        c[8].onChange(function(value) {
		            global.reInit();
		        });
		        c[9].onChange(function(value) {
		            global.reInit();
		        });
		    };
		}

		self.init = function(){
			__self.initOptions();
			__self.initGui();
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