var VideoHandler; 

(function($){

    VideoHandler = function( global ){

        var video_filenames, id = 0, video, videos = [], video_options, re_init, self = {}, color;

        color = d3.scale.category10();

        var options = function() {
            that = {}; 
            that.background_color = [ 255, 255, 255 ];
            that.video_background_color = [ 255, 255, 255 ];
            that.video_background_color_alpha = 0.01;
            that.speed = 390;
            that.start_on_init = 10;
            that.video_quality = 'high';
            that.canvas_opacity = 1;
            that.video_opacity = 1;
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

        video_filenames = [
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

        video = function(video_filename){

            // Set Main Containers
            var self = {}; // Public
            var obj = {}; // Private

            // Set Basic IDS
            obj.index = id;
            id = id + 1;
            obj.canvas_id = 'canvas-' + obj.index;
            obj.video_id  = 'video-' + obj.index;
            obj.video_filename = video_filename; 
            obj.color = color( id );

            obj.video_height = video_quality_heights[video_options.video_quality];
            obj.video_width = video_quality_widths[video_options.video_quality];

            // Create HTML for Elements
            obj.canvas_html = '<canvas id="' + obj.canvas_id + '"></canvas>';
            obj.video_html = '<video id="' + obj.video_id + '" controls loop>\
                <source src="converted-videos/' + obj.video_filename + '-'+ video_options.video_quality +'.mp4" type="video/mp4">\
            </video>';

            // Create Vars for Canvas
            obj.y_index = parseInt(Math.random() * 800, 10); 
            obj.x_index = 0;
            obj.direction = ( obj.index % 2 === 0 ) ? 'right' : 'left';
            obj.playing = false; 

            obj.canvas_width  = obj.video_width; 
            obj.canvas_height = global.getWindowWidth(); 

            obj.frame = 0; 

            self.getWidth = function(){
                return obj.canvas_width;
            }

            self.init = function(){

                // Append Canvas and Video Tag
                global.$videos_container
                    .append(obj.canvas_html)
                    .append(obj.video_html);
                
                // Get Video and Canvas Element
                obj.$video  = $("#" + obj.video_id);
                obj.$canvas = $("#" + obj.canvas_id);
                obj.video = obj.$video.get(0);
                obj.canvas = obj.$canvas.get(0);
                obj.$canvas.width( obj.canvas_width );
                obj.$canvas.height( obj.canvas_height );

                // Bind Can Play Element
                obj.$video.on('canplay', function(){
                    if(video_options.start_on_init <= obj.index){
                        obj.$canvas.click(function(){
                            self.init_video(); 
                        });
                    }
                    else {
                        self.init_video(); 
                    }
                });
            }

            self.init_video = function(){
                if( !obj.playing ){
                    self.init_canvas();
                    obj.playing = true; 
                    obj.$canvas.click(function(){
                        alert("Hello There! You have clicked on video #" + (obj.index + 1));
                    });
                }
            }

            self.init_canvas = function(){
                obj.ctx = obj.canvas.getContext('2d');
                obj.canvas.width = obj.canvas_width;
                obj.canvas.height = obj.canvas_height; 
                obj.video.play();
                requestAnimationFrame(self.draw);
            }

            self.draw = function(){
                // Fade Other Frames Away Slowly
                obj.ctx.fillStyle = self.parseArrayToRGBA( obj.color, video_options.video_background_color_alpha );

                obj.ctx.fillRect(0,0,obj.canvas.width,obj.canvas.height);
                // Draw Video Image
                if(obj.direction == 'right'){
                    obj.y_index = obj.y_index + ( video_options.speed / 100 );
                    if(obj.y_index >= obj.canvas_height){
                        obj.y_index = 0;
                    }
                }
                else if(obj.direction == 'left'){
                    obj.y_index = obj.y_index - ( video_options.speed / 100 );
                    if(obj.y_index <= 0){
                        obj.y_index = obj.canvas_height;
                    }
                }
                // Draw Image
                obj.ctx.save();
                obj.ctx.globalAlpha = video_options.video_opacity;
                obj.ctx.drawImage(obj.video,obj.x_index,obj.y_index,obj.video_width,obj.video_height);
                obj.ctx.restore();

                // Loop
                obj.frame++;
                requestAnimationFrame(self.draw);
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
            for(i in video_filenames){
                videos.push( video(video_filenames[i]) );
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
