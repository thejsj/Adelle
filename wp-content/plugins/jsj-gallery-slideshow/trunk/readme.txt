=== JSJ Gallery Slideshow ===
Contributors: jorge.silva
Donate link: http://thejsj.com
Tags: slideshow, gallery, simple, jquery, easing, animation, cargo, cycle, jsj
Requires at least: 3.3
Tested up to: 3.9
Stable tag: 1.2.8
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

JSJ Gallery Slideshow immediately improves all your WordPress galleries, with a simple, elegant and easy-to-use slideshow. 

== Description ==

JSJ Gallery Slideshow immediately improves all your WordPress galleries, with a simple, elegant and easy-to-use slideshow. It does this completely automatically (really, it’s that simple!). You only have to install the plugin and all your slideshows will be automatically converted to something like [this](http://thejsj.com/#/uncategorized/jsj-%C2%B7-gallery-slideshow-example/).

You can change the way the slideshow is displayed through changing settings such as speed, transition effect and timeout between transition. 

The plugin is based on the excellent [Jquery Cycle](http://jquery.malsup.com/cycle/options.html), one of the best jQuery slideshow plugins out there. The plugin options are also based in the [Jquery Cycle Options](http://jquery.malsup.com/cycle/options.html).

Plugin by [Jorge Silva-Jetter](http://thejsj.com)

Build with [Jquery Cycle](http://jquery.malsup.com/cycle/)

Inspired by [Cargo](http://cargocollective.com/) 

Available translations: Spanish, Dutch (Translated by [datiswous](http://profiles.wordpress.org/datiswous/)) 

== Installation ==

1. Upload the entire jsj-gallery-slideshow folder to the /wp-content/plugins/ directory or simply use the Plugin upload interface in the admin.
2. Activate the plugin through the ‘Plugins’ menu in WordPress. At that moment, all your slideshows will be automatically converted into JSJ Gallery Slideshows.
3. Optional. If you want to change any of the options for the plugin, go to Settings -> JSJ Gallery Slideshow.

== Frequently asked questions ==

If you have any questions, please try to add a ticket in the WordPress support forum for this plugin (http://wordpress.org/support/plugin/jsj-gallery-slideshow). 

If you have any feedback or suggestions, email me at jorge dot silva at thejsj dot com.

== Screenshots ==

1. Example <http://thejsj.com/uncategorized/jsj-gallery-slideshow-example/>
2. Example <http://thejsj.com/pieces/anything-worth-saying-exhibition/>
3. Example <http://thejsj.com/pieces/n-possible-routes/>
4. Example <http://thejsj.com/pieces/anything-worth-saying-interactive/>
5. Options Page 
6. Options Page (Advanced Options)

== Changelog ==

= 1.0 =
First Version. 

= 1.1 =
Added translation capabilities.
Added Spanish(es_ES) translation to plugin.
Created javascript function to ensure easier use with AJAX.
Changed default image size to 'Full'.
Fixed some HTML bugs.

= 1.1.1 =
Embarrassing spelling mistakes... will I ever learn?

= 1.1.2 =
Fixing plugin class name mistake. 

= 1.1.3 =
Fixing javascript function mistake.

= 1.1.4 =
Fixing javascript function mistake.

= 1.2 =
Completely revamped the admin for a much more intuitive experience
Optimized CSS and Javascript code through minification
Deleted some unnecessary and unintuitive settings
Added 'check for shortcode' setting

= 1.2.4 =
Added check that prevents slideshow from being initialized multiple times

= 1.2.5 =
Adding 'Resources' links and Feature Request form.

= 1.2.6 =
Minor Javascript Changes
Adding 'of' as translation string

= 1.2.7 =
Adding Dutch translation. Translated by [datiswous](http://profiles.wordpress.org/datiswous/)

== Upgrade notice ==

= 1.0 =
First Version. 

= 1.1 =
Check your html doesn't break. 
If using ajax, try using the createjsj-gallery-slideshow() function to re-init your plugin. 

= 1.1.2 =
Please update in order for plugin to work correctly. This upgrades fixes minor programming bugs.

= 1.1.3 =
Please update in order for plugin to work correctly. This upgrades fixes minor programming bugs.

= 1.1.4 =
Please update in order for plugin to work correctly. This upgrades fixes minor programming bugs.

= 1.2 =
Due to the way the plugin settings have been revamped, some settings might be deleted. Resetting your settings is recommended.  

= 1.2.4 = 
Adds small fix to prevent slideshow being initalized multiple times.

= 1.2.5 =
Adding 'Resources' links and Feature Request form.

= 1.2.6 =
Minor changes. Update and enjoy!

= 1.2.7 =
Adding Dutch translation. Translated by [datiswous](http://profiles.wordpress.org/datiswous/)

== Online Examples ==

You can see some online examples here:

1. <http://thejsj.com/#/uncategorized/jsj-gallery-slideshow-example/>

1. <http://thejsj.com/#/pieces/anything-worth-saying-exhibition/>

1. <http://thejsj.com/#/uncategorized/jsj-gallery-slideshow-example/>

1. <http://thejsj.com/#/pieces/anything-worth-saying-exhibition/>

1. <http://thejsj.com/#/pieces/n-possible-routes/>

1. <http://thejsj.com/#/pieces/anything-worth-saying-interactive/>

== Available Options ==

Simple

* Transition Effect : Select transition effect for slideshow
* Speed : Speed of slide transition (in milliseconds)
* Timeout : Milliseconds between slide transitions (0 to disable auto advance)
* Pause On Hover : Pause slideshow when hovering over slide
* Pause On Pager Hover : Pause slideshow when hovering over pager thumbnails

Advanced

* Fit Slides : Force slides to fit container
* Slide Height : Container height (if the "Fit Slides" is enabled, slides will also be resized).
* Slide Width Container width (if the "Fit Slides" is enabled, slides will also be resized)
* Slide Resize : Force slide width/height to a fixed width/height before every transition
* Container Resize : Resize container to fit largest slide
* No Wrapping Prevent slideshow from wrapping
* Auto Stop : End slideshow after X transitions (X == Auto Stop Count)
* Auto Stop Count Number of transitions (See Auto Stop)
* Starting Slide # : Zero-based index of the first slide to be displayed
* Start Backwards Start slideshow at last slide and move backwards through the stack
* Random Slides : Transition slides randomly (not applicable to shuffle fx)
* Delay : Additional delay (in ms) for first transition (hint: can be negative)
* Re-queue Timeout : Delay for re-queue (in milliseconds)
* Re-queue OnImageNotLoaded : Re-queue the slideshow if any images have not been loaded
* Manual Trump : Causes manual transition to stop an active transition, instead of being ignored
* Reverse Animation : Causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
* Synchronize Slides : In/out transitions should occur simultaneously
* Active Pager Class : Class name used for the active pager element
* Clear Type No Background : Disable extra cleartype fixing (leave false to force background color setting on slides)
* Check For Shortcode Only load plugin if [gallery] shortcode is being used in content. Deactivate if using Ajax.