<!doctype html>
<!--[if lt IE 7]> 		<html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    		<html class="no-js lt-ie10 lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>   		<html class="no-js lt-ie10 lt-ie9" lang="en"> <![endif]-->
<!--[if IE 9]>   		<html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> 	<html class="no-js" lang="en"> <!--<![endif]-->
<head>

	<!-- Meta -->
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<?php echo(is_search()) ? '<meta name="robots" content="noindex, nofollow" />' : ''; ?>
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<meta name="title" content="<?php wp_title( '|', true, 'right' ); ?>">
	<meta name="description" content="<?php bloginfo('description');?>">
	<meta name="google-site-verification" content="">
	<meta name="author" content="Adelle Lin">
	<meta charset="utf-8" />
	<meta name="Copyright" content="<?php echo ' Copyright' . bloginfo('name') . '. All Rights Reserved.';?>">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" />

	<!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="<?php bloginfo('template_url'); ?>/ico/favicon.ico">
    <link rel="icon" type="image/png" href="<?php bloginfo('template_url'); ?>/ico/favicon.ico">
    <link href="<?php bloginfo('template_url'); ?>/ico/apple-touch-icon.png" rel="apple-touch-icon" />
    <link href="<?php bloginfo('template_url'); ?>/ico/apple-touch-icon-60x60-precomposed.png" rel="apple-touch-icon" sizes="60x60" />
    <link href="<?php bloginfo('template_url'); ?>/ico/apple-touch-icon-72x72-precomposed.png" rel="apple-touch-icon" sizes="72x72" />
    <link href="<?php bloginfo('template_url'); ?>/ico/apple-touch-icon-76x76-precomposed.png" rel="apple-touch-icon" sizes="76x76" />
    <link href="<?php bloginfo('template_url'); ?>/ico/apple-touch-icon-114x114-precomposed.png" rel="apple-touch-icon" sizes="114x114" />
    <link href="<?php bloginfo('template_url'); ?>/ico/apple-touch-icon-120x120-precomposed.png" rel="apple-touch-icon" sizes="120x120" />
    <link href="<?php bloginfo('template_url'); ?>/ico/apple-touch-icon-144x144-precomposed.png" rel="apple-touch-icon" sizes="144x144" />
    <link href="<?php bloginfo('template_url'); ?>/ico/apple-touch-icon-152x152-precomposed.png" rel="apple-touch-icon" sizes="152x152" />

	<!-- CSS -->
	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css">
	
	<!-- WP Head -->
	<?php wp_head(); ?>
</head> 
<body>
	<div id="main-page-title" class="menu-item">
		<h1><a href="<?php echo get_permalink(460); ?>" id="main-page-title-link" class='page-link'><?php bloginfo('name'); ?></a></h1>
		<div id="main-page-title-secondary-text">
			<p><?php echo get_field('intro_text', 'option'); ?></p>
			<div id="loadingProgressG">
				<div id="loadingProgressG_1" class="loadingProgressG"></div>
			</div>
		</div>
	</div>
	<header id="header">
		<!-- Main Menu -->
		<nav>
			<?php wp_nav_menu( array(
				'theme_location'  => 'main_menu',
			)); ?> 
		</nav>
	</header>
	<div id="main-content" class="main-content">
