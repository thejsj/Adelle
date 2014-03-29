jQuery(function() {
    jQuery("#adminmenu").sortable({
        stop: function(event, ui) {
            amr_update_sortable_indexes();
        }
    });
    jQuery("#adminmenu").disableSelection();
});

function amr_update_sortable_indexes() {

    var positions = new Array();

    jQuery('#adminmenu > li > a:first-child').each(function(i, obj) {
        positions[i] = jQuery(this).attr('href');
    });

    var data = {
        action: 'update_menu_positions',
        menu_item_positions: positions.toString()
    };

    jQuery.post(ajaxurl, data, function(response) {});

}