<?php 

	// this hook is fired if the current viewer is not logged in
    if(isset($_REQUEST) && array_key_exists('action', $_REQUEST)){
        do_action( 'wp_ajax_nopriv_' . $_REQUEST['action'] );
    }

    // if logged in:
    if(isset($_POST) && array_key_exists('action', $_POST)){
        do_action( 'wp_ajax_' . $_POST['action'] );
    }

    // if both logged in and not logged in users can send this AJAX request,
    // add both of these actions, otherwise add only the appropriate one

    // Get Comunity Posts
    add_action( 'wp_ajax_nopriv_get-projects', 'get_projects' );
    add_action( 'wp_ajax_get-projects', 'get_projects' );

    function get_projects() {
	    header( "Content-Type: application/json" );
        error_reporting(0);
	    echo json_encode( new ProjectsView() );
	    exit;
	}

?>