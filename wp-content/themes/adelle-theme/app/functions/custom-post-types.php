<?php 

	// Register Custom Post Types

	add_action( 'init', 'create_post_type' );

	function create_post_type() {

		// Projects
		$project_lables = array(
			'name' => __( 'Projects' ),
			'singular_name' => __( 'Project' )
		);

		$project_args = array(
			'labels'        	 => $project_lables,
			'public'             => true,
	        'publicly_queryable' => true,
	        'show_ui'            => true,
	        'show_in_menu'       => true,
	        'query_var'          => true,
	        'capability_type'    => 'post',
			'rewrite' 			 => array('slug' => 'project'), // We keep this slug, in order to keep back-wards compatibiltiy with urls
			'has_archive'        => true,
	        'hierarchical'       => false,
	        'menu_position'      => 5,
			'supports'           => array( 'title', 'author', 'editor', 'excerpt', 'revisions', 'custom-fields', 'thumbnail'),
		);

		register_post_type( 'project', $project_args);
	}

?>