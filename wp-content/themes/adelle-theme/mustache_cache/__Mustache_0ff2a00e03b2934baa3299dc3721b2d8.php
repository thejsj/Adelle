<?php

class __Mustache_0ff2a00e03b2934baa3299dc3721b2d8 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        $value = $this->resolveValue($context->find('#posts'), $context, $indent);
        $buffer .= $indent . htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= ' 
';
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
        $value = $this->resolveValue($context->findDot('featured_image.get_url()'), $context, $indent);
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
        $value = $this->resolveValue($context->find('/posts'), $context, $indent);
        $buffer .= $indent . htmlspecialchars($value, 2, 'UTF-8');

        return $buffer;
    }
}
