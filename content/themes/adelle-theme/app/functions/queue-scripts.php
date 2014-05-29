<?php 

// Load theme scripts
function load_theme_scripts() {

	// Load Header Script
	wp_register_script('header', get_template_directory_uri()  . '/dist/js/header.js', array(), '', false);
	wp_enqueue_script('header');

	wp_register_script( 'footer-libs', get_template_directory_uri()  . '/dist/js/libs/footer-libs.js', array('jquery'), '', true);
	wp_enqueue_script( 'footer-libs' );	

	wp_register_script( 'footer', get_template_directory_uri()  . '/dist/js/footer.js', array('jquery','footer-libs'), '', true);
	wp_enqueue_script( 'footer' );	

	// declare the URL to the file that handles the AJAX request (wp-admin/admin-ajax.php)
    wp_localize_script( 'footer', 'MyAjax', array( 
    	'ajaxurl' => admin_url( 'admin-ajax.php' ),
    	'view'    => new ProjectsView()
    ));
}

add_action( 'wp_enqueue_scripts', 'load_theme_scripts', 0);

?>