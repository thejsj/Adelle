<?php

class __Mustache_c6409324737c226cf34390289e429815 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->section71e681ed24b2da08f949c6c130e6091f($context, $indent, $value);

        return $buffer;
    }

    private function section71e681ed24b2da08f949c6c130e6091f(Mustache_Context $context, $indent, $value)
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
                $buffer .= $indent . '
';
                $buffer .= $indent . '				<!-- Vimeo Video -->
';
                $buffer .= $indent . '
';
                $buffer .= $indent . '
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
