Templates = {
    "404" : '<div class="row 404-template"><div class="large-8 large-offset-2 columns four-zero-four"><h2>404</h2><p>Sorry, we can&#39;t find the page you are looking for! Perhaps you have entered the wrong URL? Obviously, it&#39;s not our fault!</p></div></div>',"single-project-partial" : '<article class="project single-project-partial-template"><!-- Display Post Title --><h2><a href="{{ permalink }}">{{ post_title }}</a></h2><!-- Display Post Content --><div class="entry-content">{{# vimeo_id }}<!-- Vimeo Video --><div class="main-video"><!-- width="500" height="281" --><iframe src="//player.vimeo.com/video/{{ vimeo_id }}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>{{/ vimeo_id }}{{# featured_image }}<div class="featured-image"><!-- Display Featured Image --><img class="main-image" src="{{ featured_image.url }}"></div>{{/ featured_image }}<!-- Display Main Content -->{{{ post_content }}}</div></article>',"projects-view" : '{{# posts }}{{> single-project-partial }}{{/ posts }}',"single-project-home" : '<div id="container-{{ ID }}" class="home-project-container single-project-home-template {{# available }}available-true{{/ available }}{{^ available }}available-false{{/ available }}"><div class="home-content-container"><h2>{{ post_title }}</h2><div class="excpert"></div></div><canvas id="canvas-{{ ID }}" class="{{# available }}available-true{{/ available }}{{^ available }}available-false{{/ available }}"></canvas><video id="video-{{ ID }}" controls loop>{{#video_files}}<source src="{{{ url }}}" type="{{ mime_type }}">{{/video_files}}</video></div>',"single-project" : '<div id="modal-{{ ID }}" class="reveal-modal single-modal project-modal single-project-template" data-reveal><article class="project"><!-- Display Post Title --><h2 class="change-bg-color main-project-title"><a href="{{ permalink }}">{{ post_title }}</a></h2>{{# vimeo_id }}<!-- Vimeo Video --><div class="main-video"></div>{{/ vimeo_id }}{{^ vimeo_id }}{{# featured_image }}<div class="featured-image"><!-- Display Featured Image --><img class="main-image" src="{{ featured_image.url }}"></div>{{/ featured_image }}{{/ vimeo_id }}<!-- Display Post Content --><div class="entry-content"><!-- Display Main Content -->{{{ post_content }}}</div></article><a class="close-reveal-modal top change-bg-color">&#215;</a></div>',"single" : '<article class="single single-template"><!-- Display Post Title --><h2><a href="{{ permalink }}">{{ post_title }}</a></h2><!-- Display Post Content --><div class="entry-content">{{# featured_image }}<div class="featured-image"><!-- Display Featured Image --><img class="main-image" src="{{ featured_image.url }}"></div>{{/ featured_image }}<!-- Display Main Content -->{{{ post_content }}}</div></article>',"vimeo-video" : '<iframe src="//player.vimeo.com/video/{{ vimeo_id }}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> ',
    "done": "true"
  }; 
module.exports = Templates;