<?php 
	
	class Content {

		/**
		 * Load $this template using Mustahce 
		 *
		 * @return void
		 */
		public function render_template(){

			global $mustache;

			// Render Template
			if($this->template_name){
				$this->template = $mustache->loadTemplate($this->template_name); 
				echo $this->template->render($this);
			}
		}

	}

?>