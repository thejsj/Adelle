<?php 

	class ProjectsView extends View {

		public $template_name = "projects-view";

		public function __construct(){

			parent::__construct();

			// Get All Projects
			$project_args = array(
				'posts_per_page'   => -1,
				'post_type'        => 'project',
				'post_status'      => 'publish',
			);
			$this->posts = array(); 

			foreach( get_posts( $project_args ) as $single_project){
				$new_project = new Project( $single_project ); 
				array_push( $this->posts, $new_project );
			}
		}
	}

?>