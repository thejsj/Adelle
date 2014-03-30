<?php

class __Mustache_d72830daa856bc03f603ae00422c6669 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->section4c595b78cbead11013fe101a5cb9132e($context, $indent, $value);

        return $buffer;
    }

    private function section4c595b78cbead11013fe101a5cb9132e(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = ' 
	{{> single-project-partial }}
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
                if ($partial = $this->mustache->loadPartial('single-project-partial')) {
                    $buffer .= $partial->renderInternal($context, $indent . '	');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }
}
