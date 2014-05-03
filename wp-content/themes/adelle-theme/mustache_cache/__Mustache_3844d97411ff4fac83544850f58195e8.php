<?php

class __Mustache_3844d97411ff4fac83544850f58195e8 extends Mustache_Template
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
        $buffer .= $indent . '		<!-- Display Post Title -->
';
        $buffer .= $indent . '		<h2 class="change-bg-color main-project-title">
';
        $buffer .= $indent . '			<a href="';
        $value = $this->resolveValue($context->find('permalink'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '">';
        $value = $this->resolveValue($context->find('post_title'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '</a>
';
        $buffer .= $indent . '		</h2>
';
        $buffer .= $indent . '
';
        // 'vimeo_id' section
        $value = $context->find('vimeo_id');
        $buffer .= $this->sectionA5c65b4db230498c00a1f14e733511ef($context, $indent, $value);
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
        $buffer .= $indent . '			<!-- Display Main Content -->
';
        $buffer .= $indent . '			';
        $value = $this->resolveValue($context->find('post_content'), $context, $indent);
        $buffer .= $value;
        $buffer .= '
';
        $buffer .= $indent . '		</div>
';
        $buffer .= $indent . '		<div class="related-projects">
';
        $buffer .= $indent . '			<h2>Related</h2>
';
        $buffer .= $indent . '			
';
        $buffer .= $indent . '		</div>
';
        $buffer .= $indent . '	</article>
';
        $buffer .= $indent . '	<a class="close-reveal-modal top change-bg-color">&#215;</a>
';
        $buffer .= $indent . '</div>';

        return $buffer;
    }

    private function sectionA5c65b4db230498c00a1f14e733511ef(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = '
			<!-- Vimeo Video -->
			<div class="main-video"></div>
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
                $buffer .= $indent . '			<div class="main-video"></div>
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
