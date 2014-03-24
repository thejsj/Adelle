<?php

class __Mustache_4a27c2503b15bba09077c6177c69e885 extends Mustache_Template
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
        $buffer .= $indent . '		<h2>Hello</h2>
';
        $value = $this->resolveValue($context->find('/posts'), $context, $indent);
        $buffer .= $indent . htmlspecialchars($value, 2, 'UTF-8');

        return $buffer;
    }
}
