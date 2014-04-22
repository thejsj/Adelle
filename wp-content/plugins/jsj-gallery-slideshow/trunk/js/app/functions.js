var JSJ_Gallery_SlideShow_Utilities = function(){

	var self = {}, __self ={}; 

	self.update_numbers = function(isNext, zeroBasedSlideIndex, slideElement){
		if(slideElement.src != undefined){
			galleryId = jQuery("img[src$='" + slideElement.src + "']").data("galleryid");
			self.update_pagination_string(galleryId, zeroBasedSlideIndex);
		}
		else {
			var string = "";
		}
		jQuery("#galleryNumbering-" + galleryId).html(string);
	}

	self.update_pagination_string = function(galleryId, slideNumber){
		__self.of_string = jQuery("#galleryNumbering-" + galleryId).data("numbering-translation-of");
		if(slideNumber != undefined && slideNumber > 0){
			var total = parseInt(jQuery("#galleryid-" + galleryId).data("total"));
			var string = "(" + (slideNumber + 1) + " " + __self.of_string + " " + total + ")"; // (1 of 6)
		}
		else {
			var total = parseInt(jQuery("#galleryid-" + galleryId).data("total"));
			var string = "(" + 1 + " " + __self.of_string + " " + total + ")"; // (1 of 6)
		}
		jQuery("#galleryNumbering-" + galleryId).html(string);
	}

	self.update_gallery_height = function(currSlideElement, nextSlideElement, options, forwardFlag){
		if(nextSlideElement.height > 0){
			jQuery("#galleryid-" + options.id).clearQueue().animate({
				height: nextSlideElement.height
			}, slideTransitionTime);
		}
	}

	self.set_intial_height = function(thisGallery){
		// Set Height
		// Plan A: Get it directly...
		var hght = thisGallery[0].children[0].height;
		if(hght > 1){
			thisGallery.clearQueue().animate({
				height: hght
			}, 200);
		}
		else {
			// Plan B: Try Another way...
			var myImage = new Image();
			myImage.name = thisGallery.context.images[0].src;
			myImage.src = thisGallery.context.images[0].src;
			myImage.onload = function(){
				imgHeight = this.height;
				if(imgHeight > 0){
					thisGallery.clearQueue().animate({
						height: imgHeight
					}, 200);
				}
			};
		}
	}
	return self; 
}