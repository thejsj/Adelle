<?php

class __Mustache_93ee7bdb355edb363c90ada9b9089f4c extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->sectionCf1c2370c59ca57571b03ea6d48030d5($context, $indent, $value);

        return $buffer;
    }

    private function section5301b717bfdfbf46d00d11386d30e163(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
				<!-- Vimeo Video -->
				<div class="video">
					<iframe src="//player.vimeo.com/video/88054119" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
				</div>
				';
            $result = call_user_func($value, $source, $this->lambdaHelper);
            if (strpos($result, '{{') === false) {
                $buffer .= $result;
            } else {
                $buffer .= $this->mustache
                    ->loadLambda((string) $result)
                    ->renderInternal($context);
            }
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= $indent . '				<!-- Vimeo Video -->
';
                $buffer .= $indent . '				<div class="video">
';
                $buffer .= $indent . '					<iframe src="//player.vimeo.com/video/88054119" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
';
                $buffer .= $indent . '				</div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section5c99dfc297dfef8f0881ec550e462b50(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
				<!-- Display Featured Image -->
				<img class="main-image" src="{{ featured_image.url }}">
				';
            $result = call_user_func($value, $source, $this->lambdaHelper);
            if (strpos($result, '{{') === false) {
                $buffer .= $result;
            } else {
                $buffer .= $this->mustache
                    ->loadLambda((string) $result)
                    ->renderInternal($context);
            }
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= $indent . '				<!-- Display Featured Image -->
';
                $buffer .= $indent . '				<img class="main-image" src="';
                $value = $this->resolveValue($context->findDot('featured_image.url'), $context, $indent);
                $buffer .= htmlspecialchars($value, 2, 'UTF-8');
                $buffer .= '">
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function sectionCf1c2370c59ca57571b03ea6d48030d5(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = ' 
		<article class="project">
			<!-- Display Post Title -->
			<h2>
				<a href="{{ permalink }}">{{ post_title }}</a>
			</h2>
			<!-- Display Post Content -->
			<div class="entry-content">

				
				{{# vimeo_id }}
				<!-- Vimeo Video -->
				<div class="video">
					<iframe src="//player.vimeo.com/video/88054119" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
				</div>
				{{/ vimeo_id }}

				{{# featured_image }}
				<!-- Display Featured Image -->
				<img class="main-image" src="{{ featured_image.url }}">
				{{/ featured_image }}

				<!-- Display Main Content -->
				{{ post_content }}
			</div>
		</article>
';
            $result = call_user_func($value, $source, $this->lambdaHelper);
            if (strpos($result, '{{') === false) {
                $buffer .= $result;
            } else {
                $buffer .= $this->mustache
                    ->loadLambda((string) $result)
                    ->renderInternal($context);
            }
        } elseif (!empty($value)) {
            $values = $this->isIterable($value) ? $value : array($value);
            foreach ($values as $value) {
                $context->push($value);
                $buffer .= $indent . '		<article class="project">
';
                $buffer .= $indent . '			<!-- Display Post Title -->
';
                $buffer .= $indent . '			<h2>
';
                $buffer .= $indent . '				<a href="';
                $value = $this->resolveValue($context->find('permalink'), $context, $indent);
                $buffer .= htmlspecialchars($value, 2, 'UTF-8');
                $buffer .= '">';
                $value = $this->resolveValue($context->find('post_title'), $context, $indent);
                $buffer .= htmlspecialchars($value, 2, 'UTF-8');
                $buffer .= '</a>
';
                $buffer .= $indent . '			</h2>
';
                $buffer .= $indent . '			<!-- Display Post Content -->
';
                $buffer .= $indent . '			<div class="entry-content">
';
                $buffer .= $indent . '
';
                $buffer .= $indent . '				
';
                // 'vimeo_id' section
                $value = $context->find('vimeo_id');
                $buffer .= $this->section5301b717bfdfbf46d00d11386d30e163($context, $indent, $value);
                $buffer .= $indent . '
';
                // 'featured_image' section
                $value = $context->find('featured_image');
                $buffer .= $this->section5c99dfc297dfef8f0881ec550e462b50($context, $indent, $value);
                $buffer .= $indent . '
';
                $buffer .= $indent . '				<!-- Display Main Content -->
';
                $buffer .= $indent . '				';
                $value = $this->resolveValue($context->find('post_content'), $context, $indent);
                $buffer .= htmlspecialchars($value, 2, 'UTF-8');
                $buffer .= '
';
                $buffer .= $indent . '			</div>
';
                $buffer .= $indent . '		</article>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }
}
