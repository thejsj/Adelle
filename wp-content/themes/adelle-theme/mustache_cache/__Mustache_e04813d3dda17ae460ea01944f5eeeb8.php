<?php

class __Mustache_e04813d3dda17ae460ea01944f5eeeb8 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->section60fac33fd0e41d343412684d93291870($context, $indent, $value);

        return $buffer;
    }

    private function section60fac33fd0e41d343412684d93291870(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = ' 
-----
	{{> partials/single_project }}
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
                $buffer .= $indent . '-----
';
                if ($partial = $this->mustache->loadPartial('partials/single_project')) {
                    $buffer .= $partial->renderInternal($context, $indent . '	');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }
}
