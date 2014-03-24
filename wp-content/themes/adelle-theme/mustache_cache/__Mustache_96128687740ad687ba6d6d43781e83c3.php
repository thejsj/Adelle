<?php

class __Mustache_96128687740ad687ba6d6d43781e83c3 extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->section53b4f9c665a4bc30d7308798c3a931db($context, $indent, $value);

        return $buffer;
    }

    private function section53b4f9c665a4bc30d7308798c3a931db(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = ' 
	{{> single-project }}
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
                if ($partial = $this->mustache->loadPartial('single-project')) {
                    $buffer .= $partial->renderInternal($context, $indent . '	');
                }
                $context->pop();
            }
        }
    
        return $buffer;
    }
}
