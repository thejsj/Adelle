	<footer id="footer">
	<!-- Display All Project Links ( For SEO ) -->
			<?php $view = new ProjectsView(); ?>
			<nav>
				<ul>
<?php foreach( $view->posts as $post ): ?>
					<li>
						<a href="<?php echo $post->permalink; ?>">
							<?php echo $post->post_title; ?>
						</a>
					</li>
<?php endforeach; ?>
				</ul>
			<nav>
	<!-- Wordpress Footer -->
	<?php wp_footer(); ?>
	<?php if(WP_HOME === 'http://adelleninja.com' || WP_HOME === 'http://adelle.ninja'): ?>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-26664609-5', 'adelleninja.com');
		ga('send', 'pageview');
	</script>
	<?php else : ?>
		<!-- Not Using Google Analytics, because you WP_HOME variable doesn't match the required url -->
		<!-- WP_HOME : <?php echo WP_HOME; ?> -->
	<?php endif; ?>
	</footer>
</body>
</html>