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
	<!-- DON'T FORGET ANALYTICS -->
	<!--
		<script>
		  var _gaq=[['_setAccount','UA-35795719-1'],['_trackPageview']];
		  (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
		  g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
		  s.parentNode.insertBefore(g,s)}(document,'script'));
		</script>
	--> 
	</footer>
</body>
</html>