<?php 
	
/* Include Custom Function
------------------------------------------------ */
	require_once('app/functions/custom-functions.php');
	require_once('app/functions/queue-scripts.php');

/* Custom Post Types - Projects
------------------------------------------------ */
	require_once('app/functions/custom-post-types.php');

/* Load Mustache
------------------------------------------------ */
	require_once('app/functions/mustache-loader.php');

/* Get Classes
------------------------------------------------ */
	require_once('app/views/content.php');
	require_once('app/views/single.php');
	require_once('app/views/page.php');
	require_once('app/views/project.php');
	require_once('app/views/404.php');
	require_once('app/views/view.php');
	require_once('app/views/project-view.php');
	require_once('app/views/image.php');

/* Ajax Functionality
------------------------------------------------ */
	require_once('app/functions/ajax.php');
	

?>