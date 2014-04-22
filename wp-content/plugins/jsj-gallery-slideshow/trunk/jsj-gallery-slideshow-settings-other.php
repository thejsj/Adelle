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
	),
	'defaultImageSize' => (object) array(
		'name' => 'defaultImageSize', 
		'title' => __( 'Default Image Size', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Set the default WordPress thumbnail image size, in which all thumbnails should be output (Can be overwritten individually).', 'jsj-gallery-slideshow' ),
		'type' => 'select',
		'tab' => 'advanced',
		'parameters' => array_merge(get_intermediate_image_sizes(), array('full')),
		'default' => 'full'
	)
);

?>