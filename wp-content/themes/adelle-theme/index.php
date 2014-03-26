<?php get_header(); ?>	
<?php 

	$queried_object = get_queried_object();

    if(is_404()){
        $this_object = new FourOFour();
    }
    elseif(is_front_page() || is_home()){
        $this_object = new ProjectsView($queried_object);
    }
    elseif( is_singular() && is_page() ){
        $this_object = new Page($queried_object);
    }
    elseif(is_singular() && is_single()){
        $this_object = new Project($queried_object);
    }
    elseif(is_singular() && is_single()){
        $this_object = new Single($queried_object);
    }
    else {
        $this_object = new FourOFour();
    }

?>
<noscript>
    <?php $this_object->render_template(); ?>
</noscript>
<div id='project-home-container'></div>
<?php get_footer(); ?>