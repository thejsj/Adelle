<?php

class __Mustache_541ef2b36694df121f0c56350d2e91ab extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->section5fcdf328388ba86bf216dfc9ea0c2126($context, $indent, $value);

        return $buffer;
    }

    private function section5fcdf328388ba86bf216dfc9ea0c2126(Mustache_Context $context, $indent, $value)
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

				<!-- Vimeo Video -->
				<iframe src="//player.vimeo.com/video/88054119" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 

				<!-- Display Featured Image -->
				<img class="main-image" src="{{ featured_image.url }}">
				
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
                $buffer .= $indent . '				<!-- Vimeo Video -->
';
                $buffer .= $indent . '				<iframe src="//player.vimeo.com/video/88054119" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
';
                $buffer .= $indent . '
';
                $buffer .= $indent . '				<!-- Display Featured Image -->
';
                $buffer .= $indent . '				<img class="main-image" src="';
                $value = $this->resolveValue($context->findDot('featured_image.url'), $context, $indent);
                $buffer .= htmlspecialchars($value, 2, 'UTF-8');
                $buffer .= '">
';
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
