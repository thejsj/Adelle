var createJSJGallerySlideshow = (function($){

	var isNext, zeroBasedSlideIndex, slideElement, galleryid;
	
	var cycleGallery = []; // All Galleries
	
	var utilities = new JSJ_Gallery_SlideShow_Utilities(); // Create an instance of our utilities class
	// Parse Options from WordPress
	var cycle_options = (function(){
		var options = {}; 
		var settings = jsjGallerySlideshowOptions.settings;
		for(i in settings){
			var value = settings[i];
			if(!isNaN(parseInt(value))) {
				value = parseInt(value);
			}
			if(value === 'false' || value === 'true'){
				value = (value === 'false') ? false : true; 
			}
			options[i] = value; 
		}
		return options; 
	})();

	var slideTransitionTime = cycle_options['speed'];
	
	return function(){
		jQuery('.gallery').each(function(index){
			var galleryId = jQuery(this).attr("id");
			galleryId = galleryId.replace("galleryid-",""); 
			utilities.update_pagination_string(galleryId);
			// Remove Any Previous Pagination (if resize)
			jQuery(this).parent().children('.gallery-pager').html('');
			cycleGallery[index] = jQuery("#galleryid-" + galleryId).cycle('destroy').cycle($.extend(cycle_options, { 
				id:               galleryId,
				next:             '#galleryNext-' + galleryId, 
				prev:             '#galleryPrev-' + galleryId,
				pager:            jQuery("#gallery-pager-" + galleryId), 
				onPrevNextEvent:  utilities.update_numbers, // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement),
				before: function(){ 
					var sh = jQuery(this).height();
					if(sh > 1) jQuery(this).parent().clearQueue().animate({ height: sh }, slideTransitionTime );
				},
				pagerAnchorBuilder: function(idx, slide) { // callback fn that creates a thumbnail to use as pager anchor 
					return '<li class="slideshow_thumb" style="background-image: url(' + slide.src + ');"></li>'; //<a href="#"><img src="" /></a>
				}
			})); // Append Settings to Cycle Object
			utilities.set_intial_height(cycleGallery[index]);
		});
	}
})(jQuery);

if(jsjGallerySlideshowOptions.scripts_enqueued){
	jQuery(window).resize(function(){
		createJSJGallerySlideshow();
	});
	jQuery(document).ready(function(){
		createJSJGallerySlideshow();
	});
}
