<?php 

// Start Setting Options
$jsj_gallery_slideshow_options_other = array(
	'checkForShortCode' => (object) array(
		'name' => 'checkForShortCode', 
		'title' => __( 'Check For Shortcode', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Only load plugin if [gallery] shortcode is being used in content. Deactivate if using Ajax.', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'advanced',
		'default' => 0
	)
);

?>