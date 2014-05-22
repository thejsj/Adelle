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
			$this->relational_permalink = $this->getRelationalPermalink( $this->permalink );

			// Get Featured Image
			$this->featured_image = new Image( $this->ID );

        }

        /**
         * Parse and filter the relational permalink
         *
         * @return string
         */
        public function getRelationalPermalink( $permalink ){
        	$relational_permalink = str_replace( WP_SITEURL, '', $this->permalink );
        	if( $relational_permalink[0] == "/") {
        		$relational_permalink = substr($relational_permalink, 1);
        	}
        	return $relational_permalink; 
        }
	}

?>