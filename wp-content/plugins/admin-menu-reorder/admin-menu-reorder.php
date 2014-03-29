<?php

/*
  Plugin Name: Admin Menu Reorder
  Plugin URI: http://www.wpidiots.com/plugins/admin-menu-reorder/
  Description: Easily reorder your admin menu items on the user and blog level with simple drag & drop operation. Now every blog or network user may have own admin menu order according to their preference.
  Author: WP Idiots
  Author URI: http://www.wpidiots.com/
  Version: 1.1
  License: GNU General Public License (Version 2 - GPLv2)

  Copyright 2014 WP Idiots (http://www.wpidiots.com/)

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License (Version 2 - GPLv2) as published by
  the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

/* Actions */

add_action('wp_ajax_update_menu_positions', 'amr_update_menu_positions');
add_action('admin_enqueue_scripts', 'amr_admin_enqueues');

/* Filters */

add_filter('custom_menu_order', 'amr_custom_menu_order');
add_filter('menu_order', 'amr_custom_menu_order');

/* Functions */

function amr_update_menu_positions() {
    update_user_meta(get_current_user_id(), get_current_blog_id() . '_amr_menu_positions', str_replace('admin.php?page=', '', $_REQUEST['menu_item_positions'])); // str_replace (support for custom added menu items)
}

function amr_admin_enqueues() {
    wp_enqueue_script('jquery-ui-sortable');
    wp_enqueue_script('amr_admin', plugins_url('/js/amr-admin.js', __FILE__), array('jquery-ui-sortable'));
}

function amr_custom_menu_order($menu_order) {
    if (!$menu_order)
        return true;

    $new_menu_order = get_user_meta(get_current_user_id(), get_current_blog_id() . '_amr_menu_positions', true);

    if ($new_menu_order) {
        $new_menu_order = explode(',', $new_menu_order);

        return $new_menu_order;
    } else {
        return $menu_order;
    }
}

?>