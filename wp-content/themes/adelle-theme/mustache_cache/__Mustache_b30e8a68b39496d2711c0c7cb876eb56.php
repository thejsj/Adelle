<?php

class __Mustache_b30e8a68b39496d2711c0c7cb876eb56 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '<div id="modal-';
        $value = $this->resolveValue($context->find('ID'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '" class="reveal-modal single-modal project-modal single-project-template" data-reveal>
';
        $buffer .= $indent . '	<article class="project">
';
        $buffer .= $indent . '		
';
        // 'vimeo_id' section
        $value = $context->find('vimeo_id');
        $buffer .= $this->section249f9165a1b604741d756a8de2e89e3d($context, $indent, $value);
        $buffer .= $indent . '
';
        // 'vimeo_id' inverted section
        $value = $context->find('vimeo_id');
        if (empty($value)) {
            
            // 'featured_image' section
            $value = $context->find('featured_image');
            $buffer .= $this->section3ecc4c218ed9ba4779aff331a531cd82($context, $indent, $value);
        }
        $buffer .= $indent . '
';
        $buffer .= $indent . '		<!-- Display Post Content -->
';
        $buffer .= $indent . '		<div class="entry-content">
';
        $buffer .= $indent . '
';
        $buffer .= $indent . '			<!-- Display Post Title -->
';
        $buffer .= $indent . '			<h2 class="change-color main-project-title">
';
        $buffer .= $indent . '				<a class="change-color" href="';
        $value = $this->resolveValue($context->find('permalink'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '">';
        $value = $this->resolveValue($context->find('post_title'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '</a>
';
        $buffer .= $indent . '			</h2>
';
        $buffer .= $indent . '
';
        $buffer .= $indent . '			<!-- Display Main Content -->
';
        $buffer .= $indent . '			';
        $value = $this->resolveValue($context->find('post_content'), $context, $indent);
        $buffer .= $value;
        $buffer .= '
';
        $buffer .= $indent . '		</div>
';
        $buffer .= $indent . '	</article>
';
        $buffer .= $indent . '	<a class="close-reveal-modal">&#215;</a>
';
        $buffer .= $indent . '</div>';

        return $buffer;
    }

    private function section249f9165a1b604741d756a8de2e89e3d(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
			<!-- Vimeo Video -->
			{{! <div class="main-video">
				<iframe src="//player.vimeo.com/video/{{ vimeo_id }!}" width="596" height="350" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> 
			</div>}}
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
                $buffer .= $indent . '			<!-- Vimeo Video -->
';
                $context->pop();
            }
        }
    
        return $buffer;
    }

    private function section3ecc4c218ed9ba4779aff331a531cd82(Mustache_Context $context, $indent, $value)
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
                $buffer .= $indent . '			<div class="featured-image">
';
                $buffer .= $indent . '				<!-- Display Featured Image -->
';
                $buffer .= $indent . '				<img class="main-image" src="';
                $value = $this->resolveValue($context->findDot('featured_image.url'), $context, $indent);
                $buffer .= htmlspecialchars($value, 2, 'UTF-8');
                $buffer .= '">
';
                $buffer .= $indent . '			</div>
';
                $context->pop();
            }
        }
    
        return $buffer;
    }
}