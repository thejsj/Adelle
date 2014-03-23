var VideoHandler; 

(function($){

    /**
     * Description
     * @param {} global
     * @return self
     */
    VideoHandler = function( global ){

        var __self = {}, self = {};

        self.video_quality_heights = {
            'low' : 80,
            'medium' : 160,
            'high' : 240,
        };

        self.video_quality_widths = {
            'low' : 80,
            'medium' : 160,
            'high' : 240,
        };

        __self.videos = [];

        __self.project_names = [
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

        self.color = d3.scale.category10();

        /**
         * Init All Videos
         * @method init
         * @return 
         */
        self.init = function(){
            __self.initAllVideos(); 
        }

        /**
         * Description
         * @method init
         * @return 
         */
        self.reInit = function(){
            __self.reInitAllVideos(); 
        }

        /**
         * Create a counter by which to keep tracks of video ids
         * @method getNewVideoId
         * @return Number
         */
        self.getNewVideoId = function(){
            var i = -1; 
            return function( reset ){
                if( reset === true ){
                    i = -1; 
                    return true; 
                }
                return i += 1;
            }
        }()

        /**
         * Description
         * @method initAllVideos
         * @return 
         */
        __self.initAllVideos = function(){
            for(i in __self.project_names){
                __self.videos.push( Video(__self.project_names[i], global, self ) );
            }
            if( !global.isOrientationHorizontal() ){
                // Get Width
                var total_width = 0; 
                for( i in __self.videos ){
                    total_width += __self.videos[i].getWidth(); 
                }
                global.setTotalWidth( total_width );
            }
        }

        /**
         * Description
         * @method ReInitAllVideos
         * @return 
         */
        __self.reInitAllVideos = function(){
            if( typeof __self.re_init !== 'undefined' ){
                clearTimeout( __self.re_init );
            }
            re_init = setTimeout(function(){
                // Start
                __self.videos = [];
                self.getNewVideoId(true);
                __self.initAllVideos(); 
            }, 500);
        }

        self.init(); 
        return self; 
    }

})(window.jQuery);
