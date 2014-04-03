<?php 

	class Project extends Single {

		public $template_name = "single-project";

		public function __construct( $post_id_or_object ){
			parent::__construct( $post_id_or_object );

			// Get Vimeo IDs
			$this->vimeo_id = get_post_meta( $this->ID, 'vimeo', true );

			// Get Videos
			$this->video_files = $this->get_video_files(); 

			// Get Gallery Images
			$this->fallback_images = $this->get_fallback_images(); 

			// Get Project Relationship
			$this->related_projects = $this->get_related_projects();
		}
		
		/**
		 * Get video files
		 *
		 * @return array
		 */
		private function get_video_files(){
			$video_files = array();
			$video_formats_keys = array( 'video_file_mp4', 'video_file_ogg', 'video_file_webm' );
			foreach( $video_formats_keys as $key ){
				array_push( $video_files, get_field( $key, $this->ID ) );
			}
			return $video_files;
		}

		/**
		 * Get Gallery Images For Fallback
		 *
		 * @return array
		 */
		private function get_fallback_images(){
			$fallback_images = get_field( 'video_stills', $this->ID );
			$images_array = array(); 
			foreach( $fallback_images as $image ){
				array_push( $images_array, new Image( false, $image['id'] ) );
			}
			return $images_array; 
		}

		/**
		 * Get related videos
		 *
		 * @return array
		 */
		private function get_related_projects(){
			$related_projects = array();
			$all_project_relationships = get_field('project_to_project_relationship', 'option');
			foreach( $all_project_relationships as $relationship ){
				if( $relationship['first_project']->ID === $this->ID && $relationship['second_project']->ID !== $this->ID ){
					array_push($related_projects, $relationship['second_project']->ID);
				}
				else if( $relationship['first_project']->ID !== $this->ID && $relationship['second_project']->ID === $this->ID ){
					array_push($related_projects, $relationship['first_project']->ID);
				}
			}
			return $related_projects;
		}


	}

?>