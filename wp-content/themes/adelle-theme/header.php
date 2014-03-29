<!doctype html>
<!--[if lt IE 7]> 		<html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    		<html class="no-js lt-ie10 lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>   		<html class="no-js lt-ie10 lt-ie9" lang="en"> <![endif]-->
<!--[if IE 9]>   		<html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> 	<html class="no-js" lang="en"> <!--<![endif]-->
<head>
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
	<meta name="viewport" id="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=10.0,initial-scale=1.0" />
	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css">
	<?php wp_head(); ?>
</head>
<body style="background-color: black;">
	<h1 id="main-page-title">
		<a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a>
	</h1>
	<header id="header">
		<!-- Main Menu -->
		<nav>
			<?php wp_nav_menu( array(
				'theme_location'  => 'main_menu',
			)); ?> 
		</nav>
	</header>
	<div class="main-content">
