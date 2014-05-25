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
<?php get_header(); ?>
<div id="main-page-title" class="menu-item">
        <h1><a href="<?php echo get_permalink(460); ?>" id="main-page-title-link" class='page-link'><?php bloginfo('name'); ?></a></h1>
        <div id="main-page-title-secondary-text">
            <p><?php echo get_field('intro_text', 'option'); ?></p>
            <div id="loadingProgressG">
                <div id="loadingProgressG_1" class="loadingProgressG"></div>
            </div>
        </div>
    </div>
    <header id="header">
        <!-- Main Menu -->
        <nav>
            <?php wp_nav_menu( array(
                'theme_location'  => 'main_menu',
            )); ?> 
        </nav>
    </header>
<div id="main-content" class="main-content">
    <noscript>
        <?php $this_object->render_template(); ?>
    </noscript>
    <div id='project-home-container'></div>
</div>
<div id="node-map-container">
    <span class="current-node"></span>
</div>
<?php get_footer(); ?>