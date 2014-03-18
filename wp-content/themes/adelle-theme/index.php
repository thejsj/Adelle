<?php get_header(); ?>	
<noscript>
	<section class="container">	
		<?php if(have_posts()) : ?>
			<?php while(have_posts()) : ?>
				<?php the_post(); ?> 						
				<article class="content list-content">
					<h2><a href="<?php the_permalink(); ?>"><?php the_title();?></a></h2>
					<?php the_content(); ?>
				</article>
			<?php endwhile; ?>
		<?php else : ?>
			<h2>Sorry!</h2>
			<p>No posts have been published just yet.</p>	
		<?php endif;?>
		<!-- POST LIST ENDS -->
	</section>
</noscript>
<?php get_footer(); ?>