<?php

class __Mustache_a80d55651099207528a853e6e64d9be5 extends Mustache_Template
{
    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $buffer = '';

        if ($partial = $this->mustache->loadPartial('single-project')) {
            $buffer .= $partial->renderInternal($context, $indent . '');
        }

        return $buffer;
    }
}
