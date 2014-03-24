<?php 

	class Single extends content{

		public $template_name = "single";

		public function __construct( $post_id_or_object ) {

			// Extend Object
        	$vars = get_object_vars( get_post( $post_id_or_object ) );
			foreach ($vars as $var => $value) {
				$this->$var = $value;
			}

			// Add Permalink
			$this->permalink = get_permalink( $this->ID );

			// Get Featured Image
			$this->featured_image = new Image( $this->ID );
        }

	}

?>