<?php
/*
Plugin Name: Metronet Reorder Posts
Plugin URI: http://metronet.no/
Description: Reorder posts
Version: 1.0.6
Author: Ryan Hellyer / Metronet
Author URI: http://metronet.no/

------------------------------------------------------------------------
Copyright Metronet AS

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/


/**
 * Do not continue processing since file was called directly
 * 
 * @since 1.0
 * @author Ryan Hellyer <ryan@metronet.no>
 */
if ( !defined( 'ABSPATH' ) )
	die( 'Eh! What you doin in here?' );

/**
 * Load classes
 * 
 * @since 1.0
 * @author Ryan Hellyer <ryan@metronet.no>
 */
require( 'class-reorder.php' );

/**
 * Define constants
 * 
 * @since 1.0
 * @author Ryan Hellyer <ryan@metronet.no>
 */
define( 'REORDER_DIR', rtrim( plugin_dir_path(__FILE__), '/' ) ); // Plugin folder DIR
define( 'REORDER_URL', rtrim( plugin_dir_url(__FILE__), '/' ) ); // Plugin folder URL

/**
 * Instantiate admin panel
 * Iterate through each specified post type and instantiate it's organiser
 * 
 * @since 1.0
 * @author Ryan Hellyer <ryan@metronet.no>
 */
add_action( 'wp_loaded', 'mn_reorder_posts_init', 100 ); //Load low priority in init for other plugins to generate their post types
function mn_reorder_posts_init() {
	$post_types = get_post_types( '','names' );
	
	// Add filter to allow users to control which post-types the plugin is used with via their theme
	$post_types = apply_filters( 'metronet_reorder_post_types', $post_types );
		
	foreach ( $post_types as $post_type ) {
		
		// Instantiate new reordering
		new Reorder(
			array(
				'post_type'   => $post_type,
				'order'       => 'ASC',
				'heading'     => __( 'Metronet reorder posts', 'reorder' ),
				'final'       => '',
				'initial'     => '',
				'menu_label'  => __( 'Reorder', 'reorder' ),
				'icon'        => REORDER_URL . '/metronet-icon.png',
				'post_status' => 'publish',
			)
		);
	}
} //end mt_reorder_posts_init

