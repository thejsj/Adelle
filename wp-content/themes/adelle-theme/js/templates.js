Templates = {
    "404" : '<div class="row"><div class="large-8 large-offset-2 columns four-zero-four"><h2>404</h2><p>Sorry, we can&#39;t find the page you are looking for! Perhaps you have entered the wrong URL? Obviously, it&#39;s not our fault!</p></div></div>',"single-project" : '<article class="project"><!-- Display Post Title --><h2><a href="{{ permalink }}">{{ post_title }}</a></h2><!-- Display Post Content --><div class="entry-content">{{# vimeo_id }}<!-- Vimeo Video --><div class="main-video"><iframe src="//player.vimeo.com/video/88054119" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>{{/ vimeo_id }}{{# featured_image }}<div class="featured-image"><!-- Display Featured Image --><img class="main-image" src="{{ featured_image.url }}"></div>{{/ featured_image }}<!-- Display Main Content -->{{ post_content }}</div></article>',"projects-view" : '{{# posts }}{{> single-project }}{{/ posts }}',"single-project-home" : '<div id="container-{{ ID }}"><canvas id="canvas-{{ ID }}"></canvas><video id="video-{{ ID }}" controls loop>{{#video_files}}<source src="{{{ url }}}" type="{{ mime_type }}">{{/video_files}}</video></div>',"single-project" : '{{> single-project }}',"single" : '<article class="single"><!-- Display Post Title --><h2><a href="{{ permalink }}">{{ post_title }}</a></h2><!-- Display Post Content --><div class="entry-content">{{# featured_image }}<div class="featured-image"><!-- Display Featured Image --><img class="main-image" src="{{ featured_image.url }}"></div>{{/ featured_image }}<!-- Display Main Content -->{{ post_content }}</div></article>',
    "done": "true"
  }; 
module.exports = Templates;