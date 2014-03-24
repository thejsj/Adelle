<?php

class __Mustache_c82b597b8afb4fac314894f312b65a49 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->sectionC9843bdea72cddceb005908b6ee3d6d6($context, $indent, $value);

        return $buffer;
    }

    private function sectionC9843bdea72cddceb005908b6ee3d6d6(Mustache_Context $context, $indent, $value)
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
				<!-- Display Featured Image -->
				<img class="main-image" src="{{ featured_image_url }}">
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
                $buffer .= $indent . '				<!-- Display Featured Image -->
';
                $buffer .= $indent . '				<img class="main-image" src="';
                $value = $this->resolveValue($context->find('featured_image_url'), $context, $indent);
                $buffer .= htmlspecialchars($value, 2, 'UTF-8');
                $buffer .= '">
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
