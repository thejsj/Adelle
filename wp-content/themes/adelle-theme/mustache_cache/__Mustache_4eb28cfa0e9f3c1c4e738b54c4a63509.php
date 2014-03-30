<?php

class __Mustache_4eb28cfa0e9f3c1c4e738b54c4a63509 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '<article class="project single-project-partial-template">
';
        $buffer .= $indent . '	<!-- Display Post Title -->
';
        $buffer .= $indent . '	<h2>
';
        $buffer .= $indent . '		<a href="';
        $value = $this->resolveValue($context->find('permalink'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '">';
        $value = $this->resolveValue($context->find('post_title'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '</a>
';
        $buffer .= $indent . '	</h2>
';
        $buffer .= $indent . '	<!-- Display Post Content -->
';
        $buffer .= $indent . '	<div class="entry-content">
';
        // 'vimeo_id' section
        $value = $context->find('vimeo_id');
        $buffer .= $this->sectionE965c02e5b79dd0515fd5c81d2c67ac8($context, $indent, $value);
        $buffer .= $indent . '
';
        // 'featured_image' section
        $value = $context->find('featured_image');
        $buffer .= $this->section55c0e78ecad6c62caf6bf859fd819ab6($context, $indent, $value);
        $buffer .= $indent . '
';
        $buffer .= $indent . '		<!-- Display Main Content -->
';
        $buffer .= $indent . '		';
        $value = $this->resolveValue($context->find('post_content'), $context, $indent);
        $buffer .= $value;
        $buffer .= '
';
        $buffer .= $indent . '	</div>
';
        $buffer .= $indent . '</article>';

        return $buffer;
    }

    private function sectionE965c02e5b79dd0515fd5c81d2c67ac8(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
		<!-- Vimeo Video -->
		<div class="main-video">
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
                $buffer .= $indent . '		<!-- Vimeo Video -->
';
                $buffer .= $indent . '		<div class="main-video">
';
                $buffer .= $indent . '			<iframe src="//player.vimeo.com/video/88054119" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
';
                $buffer .= $indent . '		</div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section55c0e78ecad6c62caf6bf859fd819ab6(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
		<div class="featured-image">
			<!-- Display Featured Image -->
			<img class="main-image" src="{{ featured_image.url }}">
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
                $buffer .= $indent . '		<div class="featured-image">
';
                $buffer .= $indent . '			<!-- Display Featured Image -->
';
                $buffer .= $indent . '			<img class="main-image" src="';
                $value = $this->resolveValue($context->findDot('featured_image.url'), $context, $indent);
                $buffer .= htmlspecialchars($value, 2, 'UTF-8');
                $buffer .= '">
';
                $buffer .= $indent . '		</div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }
}
