var debug_mode = false; 

(function($){

    $(document).ready(function(){
        var global = new Global(function(){
        	var video_handler = new VideoHandler( global ); 
        	var scroll_handler = new ScrollHandler( global );
        }); 
    });

    $(document).keypress(function(event){
    	if( event.keyCode === 32 ){
    		debug_mode = !debug_mode;
    	}
    })


})(window.jQuery);
