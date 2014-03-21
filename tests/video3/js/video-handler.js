var VideoHandler; 

(function($){

    VideoHandler = function( global ){

        var project_names, id = 0, video, videos = [], video_options, re_init, self = {}, color;

        color = d3.scale.category10();

        var options = function() {
            that = {}; 
            that.background_color = [ 255, 255, 255 ];
            that.video_background_color = [ 255, 255, 255 ];
            that.video_background_color_alpha = 0.009;
            that.speed = 466;
            that.start_on_init = 10;
            that.video_quality = 'high';
            that.canvas_opacity = 1;
            that.video_opacity = 0.2;
            return that;
        };
        video_options = options();

        var video_quality_heights = {
            'low' : 80,
            'medium' : 160,
            'high' : 240,
        };

        var video_quality_widths = {
            'low' : 80,
            'medium' : 160,
            'high' : 240,
        };

        project_names = [
            'asa-asha-why-cant-we-official-music-video-hd',
            'benny-sings-big-brown-eyes-official-video',
            'benny-sings-little-donna-official-video',
            'broken-social-scene-7-4-shoreline',
            'citydream-sd',
            'foodfuneral-hd',
            'weepingwalls-hd',
            'wordofmouthgameplay-sd',
            'mathieu-chedid-je-dis-aime',
            'mathieu-chedid-qui-de-nous-deux',
        ];

        video = function(project_name, images){

            // Set Main Containers
            var self = {}; // Public
            var __self = {}; // Private

            // Set Basic IDS
            __self.index = id;
            id = id + 1;
            __self.canvas_id = 'canvas-' + __self.index;
            __self.video_id  = 'video-' + __self.index;
            __self.project_name = project_name; 
            __self.fallback_images = global.fallback_images[ __self.project_name ];
            __self.uses_video = !global.getIfFallback(); 
            __self.color = color( id );

            __self.element_height = video_quality_heights[video_options.video_quality];
            __self.element_width = video_quality_widths[video_options.video_quality];

            // Create Vars for Canvas
            __self.y_index = parseInt(Math.random() * 800, 10); 
            __self.x_index = 0;
            __self.direction = ( __self.index % 2 === 0 ) ? 'right' : 'left';
            __self.bound = false; 

            __self.canvas_width  = __self.element_width; 
            __self.canvas_height = global.getWindowWidth(); 

            __self.frame = 0; 

            // Create HTML for Elements
            __self.canvas_html = '<canvas id="' + __self.canvas_id + '"></canvas>';

            __self.video_html = '<video id="' + __self.video_id + '" controls loop>\
                <source src="converted-videos/' + __self.project_name + '-'+ video_options.video_quality +'.mp4" type="video/mp4">\
            </video>';

            self.getWidth = function(){
                return __self.canvas_width;
            }

            self.init = function(){

                // Append Canvas
                global.$videos_container
                    .append(__self.canvas_html)
                __self.$canvas = $("#" + __self.canvas_id);
                __self.canvas = __self.$canvas.get(0);
                __self.$canvas.width( __self.canvas_width );
                __self.$canvas.height( __self.canvas_height );

                if( __self.uses_video ){
                    self.init_video( self.init_canvas ); 
                }
                else {
                    self.init_fallback( self.init_canvas ); 
                }
            }

            self.init_video = function( callback ){

                // Append Video Tag
                global.$videos_container
                    .append(__self.video_html);
                
                // Get Video and Canvas Element
                __self.$video  = $("#" + __self.video_id);
                __self.video = __self.$video.get(0);              

                // Bind Can Play Element
                __self.$video.on('canplay', function(){
                    self.bind_video();
                    if( typeof callback !== 'undefined' ){
                        callback();
                    }
                });
            }

            self.init_fallback = function( callback ){

                // Transform all images items into a dictionary
                for( i in __self.fallback_images ){
                    var image_file = "converted-videos/" + __self.project_name + "/" + __self.fallback_images[i];
                    __self.fallback_images[i] = {
                        filename : image_file,
                        loaded : false,
                    }
                }
                console.log( __self.fallback_images )

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

            self.bind_canvas_click = function(){
                if( !__self.bound ){
                    __self.bound = true; 
                    __self.$canvas.on('touchstart mouseup', function(){
                        alert("Hello There! You have clicked on video #" + (__self.index + 1));
                    });
                }
            }

            self.init_canvas = function(){

                // Bind Click to cnavas
                self.bind_canvas_click(); 

                // Get Canvas Element
                __self.ctx = __self.canvas.getContext('2d');
                __self.canvas.width = __self.canvas_width;
                __self.canvas.height = __self.canvas_height;

                if( __self.uses_video ){
                    __self.video.play();
                }
                else {
                    
                }
                requestAnimationFrame(self.draw);
            }

            self.draw = function(){
                // Fade Other Frames Away Slowly
                __self.ctx.fillStyle = self.parseArrayToRGBA( __self.color, video_options.video_background_color_alpha );

                __self.ctx.fillRect(0,0,__self.canvas.width,__self.canvas.height);
                // Draw Video Image
                if(__self.direction == 'right'){
                    __self.y_index = __self.y_index + ( video_options.speed / 100 );
                    if(__self.y_index >= __self.canvas_height){
                        __self.y_index = 0;
                    }
                }
                else if(__self.direction == 'left'){
                    __self.y_index = __self.y_index - ( video_options.speed / 100 );
                    if(__self.y_index <= 0){
                        __self.y_index = __self.canvas_height;
                    }
                }
                // Draw Image
                __self.ctx.save();
                __self.ctx.globalAlpha = video_options.video_opacity;

                if( __self.uses_video ){
                    self.draw_video(); 
                }
                else {
                    self.draw_fallback(); 
                }
                __self.ctx.restore();

                // Loop
                __self.frame++;
                requestAnimationFrame(self.draw);
            }

            self.draw_video = function(){
               __self.ctx.drawImage(__self.video,__self.x_index,__self.y_index,__self.element_width,__self.element_height);
            }

            self.draw_fallback = function(){
                var current_image = __self.fallback_images[ __self.frame % __self.fallback_images.length ].img;
                if( debug_mode ){
                    console.log( 'Frame : ' + __self.frame )
                    console.log( current_image );
                }
                
                __self.ctx.drawImage( current_image,__self.x_index,__self.y_index,__self.element_width,__self.element_height);
            }

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

            self.hexToRgb = function(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }

            self.init();
            return self; 
        };

        var initAllVideos = function(){
            for(i in project_names){
                videos.push( video(project_names[i]) );
            }

            // Get Width
            var total_width = 0; 
            for( i in videos ){
                total_width += videos[i].getWidth(); 
            }
            global.setTotalWidth( total_width );
        }

        // Init All Videos
        self.init = function(){
            initAllVideos(); 
            var gui = new dat.GUI();
            var c = [];
            c[c.length] = gui.addColor(video_options, 'background_color');
            c[c.length] = gui.addColor(video_options, 'video_background_color');
            c[c.length] = gui.add(video_options, 'video_background_color_alpha', 0, 0.1 );
            c[c.length] = gui.add(video_options, 'speed', 0, 1000);
            c[c.length] = gui.add(video_options, 'start_on_init', 0, 10).step(1);
            c[c.length] = gui.add(video_options, 'video_quality', ['low', 'medium', 'high']);
            c[c.length] = gui.add(video_options, 'canvas_opacity', 0, 1 );
            c[c.length] = gui.add(video_options, 'video_opacity', 0, 1 );
            for(i in c){
                c[0].onChange(function(value) {
                    $("body")
                        .css("background", video_options.background_color);
                });
                c[4].onChange(function(value) {
                    ReInitAllVideos();
                });
                c[5].onChange(function(value) {
                    ReInitAllVideos();
                });
                c[6].onChange(function(value) {
                    $("canvas").css('opacity', video_options.canvas_opacity);
                });
            };
        }

        function ReInitAllVideos(){
            clearTimeout(re_init);
            re_init = setTimeout(function(){
                // Start
                videos = [];
                id = 0;
                $("#videos-container").html(''); 
                initAllVideos(); 
            }, 500);
        }

        self.init(); 
        return self; 
    }

})(window.jQuery);
