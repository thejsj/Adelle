<?php 
	
/* Include Custom Function
------------------------------------------------ */
	require_once('functions/custom-functions.php');
	require_once('functions/queue-scripts.php');

/* Custom Post Types - Projects
------------------------------------------------ */
	require_once('functions/custom-post-types.php');

/* Load Mustache
------------------------------------------------ */
	require_once('functions/mustache-loader.php');

/* Get Classes
------------------------------------------------ */
	require_once('views/content.php');
	require_once('views/single.php');
	require_once('views/page.php');
	require_once('views/project.php');
	require_once('views/404.php');
	require_once('views/view.php');
	require_once('views/project-view.php');
	require_once('views/image.php');

/* Ajax Functionality
------------------------------------------------ */
	require_once('functions/ajax.php');
	

?>