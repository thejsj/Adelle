<?php

	class Image {

		function __construct( $post_id, $attachment_id = false ){

			if($post_id !== false){
				$this->post_id = $post_id;
				$this->attachment_id = get_post_thumbnail_id($this->post_id);
			}
			else {
				$this->attachment_id = $attachment_id;
			}

			$this->url = $this->get_url();
		}

		public function get_url( $size = false){

			if( !isset( $size ) || $size === false ){
				$size = 'slideshow';
			}
			$url = wp_get_attachment_image_src(
				$this->attachment_id,
				$size
			);
			return $url[0];
		}
	}

?>