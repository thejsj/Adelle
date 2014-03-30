<?php 

	class Single extends content{

		public $template_name = "single";

		public function __construct( $post_id_or_object ) {

			// Extend Object
        	$vars = get_object_vars( get_post( $post_id_or_object ) );
			foreach ($vars as $var => $value) {
				$this->$var = $value;
			}

			// Apply Filters
			$this->post_content_unfiltered = $this->post_content; 

			$this->post_content = apply_filters('the_content', $this->post_content);

			// Add Permalink
			$this->permalink = get_permalink( $this->ID );
			// http://adelle.local.com/project/storage-sting/
			$this->relational_permalink = str_replace( WP_SITEURL, '', $this->permalink );

			// Get Featured Image
			$this->featured_image = new Image( $this->ID );
        }

	}

?>