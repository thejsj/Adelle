<?php

class __Mustache_e99d243b460059588218041824a5fe9c extends Mustache_Template
{
    private $lambdaHelper;

    public function renderInternal(Mustache_Context $context, $indent = '')
    {
        $this->lambdaHelper = new Mustache_LambdaHelper($this->mustache, $context);
        $buffer = '';

        $buffer .= $indent . '<h1>Hello</h1>
';
        // 'posts' section
        $value = $context->find('posts');
        $buffer .= $this->sectionFbf5fe6b3e968f12c903d547f8f5d8bc($context, $indent, $value);

        return $buffer;
    }

    private function sectionFbf5fe6b3e968f12c903d547f8f5d8bc(Mustache_Context $context, $indent, $value)
    {
        $buffer = '';
        if (!is_string($value) && is_callable($value)) {
            $source = ' 
	<h2>
		<a href="{{ permalink }}">!!{{ post_title }}</a>
	</h2>
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
                $context->pop();
            }
        }
    
        return $buffer;
    }
}
