<?php

	// Add post thumbnail support and declare image sizes
	add_theme_support('post-thumbnails');

	// Clean up the <head>
	function removeHeadLinks() {
		remove_action('wp_head', 'rsd_link');
		remove_action('wp_head', 'wlwmanifest_link');
	}
	add_action('init', 'removeHeadLinks');
	remove_action('wp_head', 'wp_generator');

	// Clean up the title and meta title tags in the head
	function custom_title( $title, $sep ) {
		global $paged, $page;
		if ( is_feed() )
			return $title;
		$title .= get_bloginfo( 'name' );
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) )
			$title = "$title $sep $site_description";
		if ( $paged >= 2 || $page >= 2 )
			$title = "$title $sep " . sprintf( __( 'Page %s', 'twentytwelve' ), max( $paged, $page ) );	
		return $title;
	}
	add_filter( 'wp_title', 'custom_title', 10, 2 );	

	// Add RSS links to <head> section
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Remove unused menu pages
	 */

	add_action( 'admin_menu', 'my_remove_menu_pages' );

	function my_remove_menu_pages() {
		remove_menu_page('link-manager.php');
		// remove_menu_page('edit-comments.php');        
	}

	/*
	 * Thumbnails
	 */

	if ( function_exists( 'add_theme_support' ) ) { 
		// Add post thumbnail support and declare image sizes
		add_theme_support('post-thumbnails');
		add_image_size( 'facebook', 1200, 630, true ); 
		add_image_size( 'slideshow', 700, 400 );
		add_image_size( 'slideshow@2x', 700 * 2, 400 * 2 );
		add_image_size( 'content', 552, 700 );
		add_image_size( 'content@2x', 552 * 2, 700 * 2 );
		add_image_size( 'video_still', 360, 240 ); 
		add_image_size( 'video_still@2x', 360 * 2, 240 * 2 ); 
	}

	/*
	 * Menus
	 */

	register_nav_menus( array(
		'main_menu' => 'Main Menu'
	));

?>