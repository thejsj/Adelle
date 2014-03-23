var debug_mode = false; 

(function($){

    $(document).ready(function(){
        var global = new Global(function( self ){
            // Init Videos and Scroll Handler
        	self.video_handler = new VideoHandler( global ); 
        	self.scroll_handler = new ScrollHandler( global );
        }); 
    });

    $(document).keypress(function(event){
    	if( event.keyCode === 32 ){
    		debug_mode = !debug_mode;
    	}
    });

})(window.jQuery);
