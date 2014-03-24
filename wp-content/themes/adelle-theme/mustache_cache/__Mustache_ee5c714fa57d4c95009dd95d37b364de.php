<?php

class __Mustache_ee5c714fa57d4c95009dd95d37b364de extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        $buffer .= $indent . '<h1>Hello</h1>
';
        $value = $this->resolveValue($context->find('#posts'), $context, $indent);
        $buffer .= $indent . htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= ' 
';
        $buffer .= $indent . '	<h2>
';
        $buffer .= $indent . '		<a href="';
        $value = $this->resolveValue($context->find('permalink'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '">!!';
        $value = $this->resolveValue($context->find('post_title'), $context, $indent);
        $buffer .= htmlspecialchars($value, 2, 'UTF-8');
        $buffer .= '</a>
';
        $buffer .= $indent . '	</h2>
';
        $value = $this->resolveValue($context->find('/posts'), $context, $indent);
        $buffer .= $indent . htmlspecialchars($value, 2, 'UTF-8');

        return $buffer;
    }
}
