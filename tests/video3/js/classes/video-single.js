var Video; 

(function($){

   /**
	 * Description
	 * @param {} project_name
	 * @param {} images
	 * @return self
	 */
	Video = function(project_name, global, video_handler ){

	    // Set Main Containers
	    var self = {}; // Public
	    var __self = {}; // Private

	    // Set Basic IDS
	    __self.index = video_handler.getNewVideoId();
	    __self.canvas_id = 'canvas-' + __self.index;
	    __self.video_id  = 'video-' + __self.index;
	    __self.project_name = project_name; 
	    __self.fallback_images = global.fallback_images[ __self.project_name ];
	    __self.uses_video = !global.get( 'fallback_view' ); 
	    __self.color = video_handler.color( __self.index );
	    __self.bound = false; 

	    __self.element_height = video_handler.video_quality_heights[ global.options.get('video_quality') ];
	    __self.element_width  = video_handler.video_quality_widths[ global.options.get('video_quality') ];

	    // Create Vars for Canvas	   
	    if( global.isOrientationHorizontal() ){
	        __self.canvas_width  = global.get( 'window_width' );
	        __self.canvas_height = __self.element_height;
	        __self.y_index = 0;
	    	__self.x_index = parseInt(Math.random() * __self.canvas_width, 10); 
	    	__self.direction = ( __self.index % 2 === 0 ) ? 'right' : 'left';
	    }
	    else {
	        __self.canvas_width  = __self.element_width; 
	        __self.canvas_height = global.get( 'window_height' );
	        __self.y_index = parseInt(Math.random() * __self.canvas_height, 10); 
	    	__self.x_index = 0;  
	    	__self.direction = ( __self.index % 2 === 0 ) ? 'up' : 'down';
	    }
	   
	    // Frames
	    __self.dummy_frame = 0; 
	    __self.frame = 0; 

	    // Create HTML for Elements
	    __self.canvas_html = '<canvas id="' + __self.canvas_id + '"></canvas>';
	    __self.video_html = '<video id="' + __self.video_id + '" controls loop>\
	        <source src="converted-videos/' + __self.project_name + '-'+ global.options.get('video_quality') +'.mp4" type="video/mp4">\
	    </video>';

	    /* * * * * * * * * * * * *
	     *                       *
	     *    Initialization     *
	     *                       *
	     * * * * * * * * * * * * */

	    /**
	     * Description
	     * @method init
	     * @return 
	     */
	    self.init = function(){

	        // Append Canvas
	        global.$videos_container
	            .append(__self.canvas_html);

	        __self.$canvas = $("#" + __self.canvas_id);
	        __self.canvas  = __self.$canvas.get(0);
	        __self.$canvas.width( __self.canvas_width );
	        __self.$canvas.height( __self.canvas_height );

	        if( __self.uses_video ){
	            __self.init_video( __self.init_canvas ); 
	        }
	        else {
	            __self.init_fallback( __self.init_canvas ); 
	        }
	    }

	    /**
	     * Description
	     * @method init_video
	     * @param {} callback
	     * @return 
	     */
	    __self.init_video = function( callback ){

	        // Append Video Tag
	        global.$videos_container
	            .append(__self.video_html);
	        
	        // Get Video and Canvas Element
	        __self.$video  = $("#" + __self.video_id);
	        __self.video = __self.$video.get(0);              

	        // Bind Can Play Element
	        __self.$video.on('canplay', function(){
	            __self.bind_canvas_click();
	            if( typeof callback !== 'undefined' ){
	                callback();
	            }
	        });
	    }

	    /**
	     * Description
	     * @method init_fallback
	     * @param {} callback
	     * @return 
	     */
	    __self.init_fallback = function( callback ){

	        // Transform all images items into a dictionary
	        for( i in __self.fallback_images ){
	            var image_file = "converted-videos/" + __self.project_name + "/" + __self.fallback_images[i];
	            __self.fallback_images[i] = {
	                filename : image_file,
	                loaded : false,
	            }
	        }

	        // Load ALl Images In the Array
	        for(i in __self.fallback_images){
	            var this_image = __self.fallback_images[i];
	            this_image.img = $("<img />")
	                .attr('src', this_image.filename)
	                .data('index', i)
	                .data('id', this_image.filename)
	                .load(function() {
	                    var $this = $(this);
	                    var index = $this.data('index');
	                    if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
	                       console.error('Broken Image : ' + __self.fallback_images[i].filename );
	                    }
	                    __self.fallback_images[index].loaded = true; 
	                    var number_of_images_not_loaded = 0; 
	                    for(i in __self.fallback_images){
	                        if( __self.fallback_images[i].loaded !== true ){
	                            number_of_images_not_loaded += 1;  
	                        }
	                    }
	                    if( number_of_images_not_loaded === 0 ){
	                        if( typeof callback !== 'undefined' ){
	                            callback();
	                        }
	                    }
	                }); 
	            this_image.img = this_image.img[0];
	        }
	    }

	    /**
	     * Description
	     * @method bind_canvas_click
	     * @return 
	     */
	    __self.bind_canvas_click = function(){
	        if( !__self.bound ){
	            __self.bound = true; 
	            __self.$canvas.on('touchend mouseup', function(){
	            	if( !global.get('dragging') ){
	            		console.log( 'Touchend Video Activate' );
	                	alert("Hello There! You have clicked on video #" + (__self.index + 1));
	            	}
	            });
	        }
	    }

	    /**
	     * Description
	     * @method init_canvas
	     * @return 
	     */
	    __self.init_canvas = function(){

	        // Bind Click to cnavas
	        __self.bind_canvas_click(); 

	        // Get Canvas Element
	        __self.ctx = __self.canvas.getContext('2d');
	        __self.canvas.width  = __self.canvas_width;
	        __self.canvas.height = __self.canvas_height;

	        if( __self.uses_video ){
	            __self.video.play();
	        }
	        else {
	            
	        }
	        requestAnimationFrame(self.draw);
	    }

	    /**
	     * Description
	     * @method draw
	     * @return 
	     */
	    self.draw = function(){

	    	if( global.get('paused') ){
	    		// Don't Render This Frame
				requestAnimationFrame(self.draw);
				return false; 
	    	}

	        // Fade Other Frames Away Slowly
	        __self.ctx.fillStyle = self.parseArrayToRGBA( __self.color, global.options.get('video_background_color_alpha') );
	       	__self.ctx.fillRect(0,0,__self.canvas.width,__self.canvas.height);

	       	var double_draw    = false; 
	       	var double_x_index = null;
	       	var double_y_index = null; 

	        // Get Positioning of Next Frame
	        if( global.isOrientationHorizontal() ){
	        	if(__self.direction == 'right'){
		            __self.x_index = __self.x_index + ( global.options.get('speed') / 100 );
		            if( ( __self.x_index + __self.element_width ) >= __self.canvas_width ){
		            	double_x_index = __self.x_index - __self.canvas_width;
		            	double_draw    = true; 
		            }
		            if(__self.x_index >= __self.canvas_width){
		                __self.x_index = 0;
		            }
		        }
		        else if(__self.direction == 'left'){
		            __self.x_index = __self.x_index - ( global.options.get('speed') / 100 );
		            if( ( __self.element_width - __self.x_index ) <= 0 ){
		            	double_x_index = __self.x_index - __self.canvas_width;
		            	double_draw    = true; 
		            }
		            if(__self.x_index <= 0){
		                __self.x_index = __self.canvas_width;
		            }
		        }
	        }
	        else {
	        	if(__self.direction == 'up'){
		            __self.y_index = __self.y_index + ( global.options.get('speed') / 100 );
		            
		            if( ( __self.element_height - __self.y_index ) <= 0  ){
		            	double_y_index = __self.y_index - __self.canvas_height;
		            	double_draw    = true;
		            }
		            if(__self.y_index >= __self.canvas_height){
		                __self.y_index = 0;
		            }
		        }
		        else if(__self.direction == 'down'){
		            __self.y_index = __self.y_index - ( global.options.get('speed') / 100 );
		            if( ( __self.y_index + __self.element_height ) >= __self.canvas_height  ){
		            	double_y_index = __self.y_index - __self.canvas_height;
		            	double_draw    = true; 
		            }
		            if(__self.y_index <= 0){
		                __self.y_index = __self.canvas_height;
		            }
		        }
	        }
	        
	        // Draw Image
	        __self.ctx.save();
	        __self.ctx.globalAlpha = global.options.get('video_opacity');

	        if( __self.uses_video ){
	            self.draw_element( __self.video, double_draw, double_x_index, double_y_index ); 
	        }
	        else {
	        	var current_image = __self.fallback_images[ __self.frame % __self.fallback_images.length ].img;  
	            self.draw_element( current_image, double_draw, double_x_index, double_y_index ); 
	        }
	        __self.ctx.restore();

	        // Loop
	        __self.dummy_frame++;
	        if( __self.uses_video ){
	            __self.frame += 1;
	        }
	        else if( __self.dummy_frame % 20 === 0 ){
	            __self.frame += 1;
	        }
	        
	        requestAnimationFrame(self.draw);
	    }

	    /**
	     * Description
	     * @method draw_video
	     * @return 
	     */
	    self.draw_element = function( element, double_draw, double_x_index, double_y_index ){
	       __self.ctx.drawImage( element,__self.x_index,__self.y_index,__self.element_width,__self.element_height);
	       if( double_draw !== false ){
	       		if( double_x_index === null ){
	       			double_x_index = __self.x_index;
	       		}
	       		if( double_y_index === null ){
	       			double_y_index = __self.y_index;
	       		}
				__self.ctx.drawImage( element, double_x_index, double_y_index,__self.element_width,__self.element_height);
	       }
	    }

	    /* * * * * * * * * * * * *
	     *                       *
	     *         Color         *
	     *                       *
	     * * * * * * * * * * * * */

	    /**
	     * Description
	     * @method parseArrayToRGBA
	     * @param {} color
	     * @param {} alpha
	     * @return BinaryExpression
	     */
	    self.parseArrayToRGBA = function(color, alpha){
	        if(typeof color === 'string'){
	            var color = self.hexToRgb(color);
	        }
	        else if(typeof color === 'object'){
	            var color = {
	                r : color[0],
	                g : color[1],
	                b : color[2],
	            };
	        }
	        else {
	            return false; 
	        }
	        return "rgba(" + parseInt(color.r, 10) + "," + parseInt(color.g,10) + "," + parseInt(color.b,10) + "," + alpha.toFixed(4) + ")";
	    }

	    /**
	     * Description
	     * @method hexToRgb
	     * @param {} hex
	     * @return ConditionalExpression
	     */
	    self.hexToRgb = function(hex) {
	        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	        return result ? {
	            r: parseInt(result[1], 16),
	            g: parseInt(result[2], 16),
	            b: parseInt(result[3], 16)
	        } : null;
	    }

	    /* * * * * * * * * * * * *
	     *                       *
	     *        Getters        *
	     *                       *
	     * * * * * * * * * * * * */
	     
	    /**
	     * Description
	     * @method getWidth
	     * @return MemberExpression
	     */
	    self.getWidth = function(){
	        return __self.canvas_width;
	    }


	    self.init();
	    return self; 
	};

})(window.jQuery);