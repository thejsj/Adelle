<?php 

class AdelleIndexPage {

    /**
     * Start up
     */
    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_plugin_page' ) );
    }

    /**
     * Add options page
     */
    public function add_plugin_page () {
        // This page will be under "Settings"
        add_management_page(
            'Index Page Admin', 
            'Index Page ', 
            'manage_options', 
            'my-setting-admin', 
            array( $this, 'create_admin_page' )
        );
    }

    /**
     * Options page callback
     */
    public function create_admin_page () {

        $view = new ProjectsView(); 

        ?>
        <div class="wrap">
            <h1>Index Page</h1>
            <h2>Name And Link</h2> 
            <?php foreach($view->posts as $post): ?>
                <p><?php echo $post->post_title; ?></p>
                <p><?php echo $post->permalink; ?></p>
            <?php endforeach; ?>
            <h2>Name And Link (in bold)</h2> 
            <?php foreach($view->posts as $post): ?>
                <p><strong><?php echo $post->post_title; ?></strong></p>
                <p><?php echo $post->permalink; ?></p>
            <?php endforeach; ?>
            <h2>Name as Link</h2> 
            <?php foreach($view->posts as $post): ?>
                <p>
                    <a href="<?php echo $post->permalink; ?>">
                        <?php echo $post->post_title; ?>
                    </a>
                </p>
            <?php endforeach; ?>
            <h2>Just Names</h2> 
            <?php foreach($view->posts as $post): ?>
                <p><?php echo $post->post_title; ?></p>
            <?php endforeach; ?>
            <h2>Just Links</h2> 
            <?php foreach($view->posts as $post): ?>
                <p><?php echo $post->permalink; ?></p>
            <?php endforeach; ?>
        </div>
        <?php
    }
}

if( is_admin() ) {
    $my_settings_page = new AdelleIndexPage();
}
