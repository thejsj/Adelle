<?php 
 // Start Setting Options
$jsj_gallery_slideshow_options_cycle = Array(

	// Easy

	'fx' => (object) array(
		'name' => 'fx', 
		'title' => __( 'Transition Effect', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Select transition effect for slideshow', 'jsj-gallery-slideshow' ),
		'type' => 'select',
		'tab' => 'simple',
		'parameters' => array("blindX","blindY","blindZ","cover","curtainX","curtainY","fade","fadeZoom","growX","growY","scrollUp","scrollDown","scrollLeft","scrollRight","scrollHorz","scrollVert","shuffle","slideX","slideY","toss","turnUp","turnDown","turnLeft","turnRight","uncover","wipe","zoom"),
		'default' => 'fade'
	),
	'speed' => (object) array(
		'name' => 'speed', 
		'title' => __( 'Speed', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Speed of slide transition (in milliseconds)', 'jsj-gallery-slideshow' ),
		'type' => 'number',
		'tab' => 'simple',
		'default' => 700
	),
	'timeout' => (object) array(
		'name' => 'timeout', 
		'title' => __( 'Timeout', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Milliseconds between slide transitions (0 to disable auto advance)', 'jsj-gallery-slideshow' ),
		'type' => 'number',
		'tab' => 'simple',
		'default' => 0
	),
	'pause' => (object) array(
		'name' => 'pause', 
		'title' => __( 'Pause On Hover', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Pause slideshow when hovering over slide', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'simple',
		'default' => 0
	),
	'pauseOnPagerHover' => (object) array(
		'name' => 'pauseOnPagerHover', 
		'title' => __( 'Pause On Pager Hover', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Pause slideshow when hovering over pager thumbnails', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'simple',
		'default' => 0
	),

	// Advanced

	'fit' => (object) array(
		'name' => 'fit', 
		'title' => __( 'Fit Slides', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Force slides to fit container', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'convert_to_boolean' => true,
		'tab' => 'advanced',
		'default' => 0,
	),
	'height' => (object) array(
		'name' => 'height', 
		'title' => __( 'Slide Height', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Container height (if the "Fit Slides" is enabled, slides will also be resized).', 'jsj-gallery-slideshow' ),
		'type' => 'text',
		'tab' => 'advanced',
		'default' => 'auto'
	),
	'width' => (object) array(
		'name' => 'width', 
		'title' => __( 'Slide Width', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Container width (if the "Fit Slides" is enabled, slides will also be resized)', 'jsj-gallery-slideshow' ),
		'type' => 'text',
		'tab' => 'advanced',
		'default' => null
	),
	'slideResize' => (object) array(
		'name' => 'slideResize', 
		'title' => __( 'Slide Resize', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Force slide width/height to a fixed width/height before every transition', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'advanced',
		'default' => 0,
	),
	'containerResize' => (object) array(
		'name' => 'containerResize', 
		'title' => __( 'Container Resize', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Resize container to fit largest slide', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'advanced',
		'default' => 1,
	),
	'nowrap' => (object) array(
		'name' => 'nowrap', 
		'title' => __( 'No Wrapping', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Prevent slideshow from wrapping', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'advanced',
		'default' => 0
	),
	'autostop' => (object) array(
		'name' => 'autostop', 
		'title' => __( 'Auto Stop', 'jsj-gallery-slideshow' ),
		'descp' => __( 'End slideshow after X transitions (X == Auto Stop Count)', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'convert_to_boolean' => true,
		'tab' => 'advanced',
		'default' => 0,
	),
	'autostopCount' => (object) array(
		'name' => 'autostopCount', 
		'title' => __( 'Auto Stop Count', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Number of transitions (See Auto Stop)', 'jsj-gallery-slideshow' ),
		'type' => 'number',
		'tab' => 'advanced',
		'default' => 0,
	),
	'startingSlide' => (object) array(
		'name' => 'startingSlide', 
		'title' => __( 'Starting Slide #', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Zero-based index of the first slide to be displayed', 'jsj-gallery-slideshow' ),
		'type' => 'number',
		'tab' => 'advanced',
		'default' => 0
	),
	'backwards' => (object) array(
		'name' => 'backwards', 
		'title' => __( 'Start Backwards', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Start slideshow at last slide and move backwards through the stack', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'convert_to_boolean' => true,
		'tab' => 'advanced',
		'default' => 0,
	),
	'random' => (object) array(
		'name' => 'random', 
		'title' => __( 'Random Slides', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Transition slides randomly (not applicable to shuffle fx)', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'advanced',
		'default' => 0
	),
	'delay' => (object) array(
		'name' => 'delay', 
		'title' => __( 'Delay', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Additional delay (in ms) for first transition (hint: can be negative)', 'jsj-gallery-slideshow' ),
		'type' => 'number',
		'tab' => 'advanced',
		'default' => 0,
	),
	'requeueTimeout' => (object) array(
		'name' => 'requeueTimeout', 
		'title' => __( 'Re-queue Timeout', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Delay for re-queue (in milliseconds)', 'jsj-gallery-slideshow' ),
		'type' => 'number',
		'tab' => 'advanced',
		'default' => 250
	),
	'requeueOnImageNotLoaded' => (object) array(
		'name' => 'requeueOnImageNotLoaded', 
		'title' => __( 'Re-queue OnImageNotLoaded', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Re-queue the slideshow if any images have not been loaded', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'convert_to_boolean' => true,
		'tab' => 'advanced',
		'default' => 1,
	),
	// 'fastOnEvent' => (object) array(
	// 	'name' => 'fastOnEvent', 
	// 	'title' => __( 'FastOn Event', 'jsj-gallery-slideshow' ),
	// 	'descp' => __( 'Force fast transitions when triggered manually (via pager or prev/next), value == time in ms', 'jsj-gallery-slideshow' ),
	// 	'type' => 'boolean',
	// 	'default' => 0,
	// ),	
	'manualTrump' => (object) array(
		'name' => 'manualTrump', 
		'title' => __( 'Manual Trump', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Causes manual transition to stop an active transition, instead of being ignored', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'convert_to_boolean' => true,
		'tab' => 'advanced',
		'default' => 1,
	),
	// 'metaAttr' => (object) array(
	// 	'name' => 'metaAttr', 
	// 	'title' => __( 'Data Attribute', 'jsj-gallery-slideshow' ),
	// 	'descp' => __( 'data- attribute that holds the option data for the slideshow.', 'jsj-gallery-slideshow' ),
	// 	'type' => 'text',
	// 	'default' => 'cycle'
	// ),
	'rev' => (object) array(
		'name' => 'rev', 
		'title' => __( 'Reverse Animation', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'advanced',
		'default' => 0,
	),
	'sync' => (object) array(
		'name' => 'sync', 
		'title' => __( 'Synchronize Slides', 'jsj-gallery-slideshow' ),
		'descp' => __( 'In/out transitions should occur simultaneously', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'tab' => 'advanced',
		'default' => 1,
	),
	'activePagerClass'=> (object) array(
		'name' => 'activePagerClass', 
		'title' => __( 'Active Pager Class', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Class name used for the active pager element', 'jsj-gallery-slideshow' ),
		'type' => 'text',
		'tab' => 'advanced',
		'default' => 'activeSlide'
	),
	'cleartypeNoBg' => (object) array(
		'name' => 'cleartypeNoBg', 
		'title' => __( 'Clear Type No Background', 'jsj-gallery-slideshow' ),
		'descp' => __( 'Disable extra cleartype fixing (leave false to force background color setting on slides)', 'jsj-gallery-slideshow' ),
		'type' => 'boolean',
		'convert_to_boolean' => true,
		'tab' => 'advanced',
		'default' => 0,
	),
);

?>