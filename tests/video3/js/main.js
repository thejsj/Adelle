(function($){

    $(document).ready(function(){
        var global = new Global(function( self ){
            // Init Videos and Scroll Handler
        	self.video_handler = new VideoHandler( global ); 
        	self.scroll_handler = new ScrollHandler( global );
        }); 
    });

})(window.jQuery);
