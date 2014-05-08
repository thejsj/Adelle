<?php 

	class ProjectsView extends View {

		public $template_name = "projects-view";

		public function __construct(){
			parent::__construct();
			$this->posts = $this->get_all_posts(); 
			$this->pages = $this->get_all_pages(); 
		}

		/**
		 * Get posts
		 *
		 * @return array
		 */
		public function get_all_posts(){
			$posts = array(); 

			// Get All Projects
			$project_args = array(
				'posts_per_page'   => -1,
				'post_type'        => 'project',
				'post_status'      => 'publish',
			);

			foreach( get_posts( $project_args ) as $single_project){
				$new_project = new Project( $single_project ); 
				if(count($new_project->fallback_images) > 0){
					array_push( $posts, $new_project );
				}
			}
			return $posts; 
		}

		/**
		 * Get pages
		 *
		 * @return array
		 */
		public function get_all_pages(){
			$pages = array(); 

			// Get All Projects
			$page_args = array(
				'posts_per_page'   => -1,
				'post_type'        => 'page',
				'post_status'      => 'publish',
			);

			foreach( get_posts( $page_args ) as $single){
				$page = new Page( $single ); 
				array_push( $pages, $page );
			}
			return $pages; 
		}

	}

?>