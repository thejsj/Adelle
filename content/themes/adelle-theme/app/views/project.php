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
			$this->related_projects = $this->get_related_projects_ids();

			$this->related_project_posts = $this->get_related_projects( $this->related_projects ); 
			$this->has_related_projects = (count($this->related_project_posts) > 0 ? true : false);
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
				$video_file = get_field( $key, $this->ID );
				if($video_file !== false){
					array_push( $video_files, $video_file);
				}
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
			if($fallback_images && count($fallback_images) > 0){
				foreach( $fallback_images as $image ){
					array_push( $images_array, new Image( false, $image['id'] ) );
				}
			}
			return $images_array; 
		}

		/**
		 * Get related videos
		 *
		 * @return array of ids
		 */
		private function get_related_projects_ids(){
			$related_projects_ids = array();
			$all_project_relationships_unfiletered = get_field('project_to_project_relationship', 'option');
			$all_project_relationships = array(); 
			// Filter out project that aren't published
			foreach( $all_project_relationships_unfiletered as $relationship ){
				if(
					get_post($relationship['first_project']->ID)->post_status === 'publish' &&
					get_post($relationship['second_project']->ID)->post_status === 'publish'
				){
					array_push($all_project_relationships, $relationship); 
				}
			}
			// Push projects
			foreach( $all_project_relationships as $relationship ){
				if( $relationship['first_project']->ID === $this->ID && $relationship['second_project']->ID !== $this->ID ){
					array_push($related_projects_ids, $relationship['second_project']->ID);
				}
				else if( $relationship['first_project']->ID !== $this->ID && $relationship['second_project']->ID === $this->ID ){
					array_push($related_projects_ids, $relationship['first_project']->ID);
				}
			}
			return $related_projects_ids;
		}

		/**
		 * Get all projects in array
		 * 
		 * @return array
		 */ 
		private function get_related_projects( $ids ){
			$related_projects = array(); 
			foreach( $ids as $key => $project_id ){
				$singleProject = new Single($project_id); 
				$singleProject->class = ( $key % 2 == 0 ) ? 'even' : 'odd';
				array_push( $related_projects, $singleProject);
			}
			return $related_projects;
		}

	}
?>