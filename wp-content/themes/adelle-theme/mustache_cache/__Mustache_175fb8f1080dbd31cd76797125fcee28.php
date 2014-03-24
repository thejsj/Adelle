<?php

class __Mustache_175fb8f1080dbd31cd76797125fcee28 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->section25437e06379bf7b8c3b1d6ee28c94638($context, $indent, $value);

        return $buffer;
    }

    private function section25437e06379bf7b8c3b1d6ee28c94638(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = ' 
	{{> single_project }}
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
                if ($partial = $this->mustache->loadPartial('single_project')) {
                    $buffer .= $partial->renderInternal($context, $indent . '	');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }
}
