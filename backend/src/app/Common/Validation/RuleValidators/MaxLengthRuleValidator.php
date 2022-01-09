<?php

namespace App\Common\Validation\RuleValidators;

use App\Common\Validation\RuleValidator\SingleRuleValidator;

/**
 * Checks if single value has length less than or equal to given param
 *
 * Ex.:
 * validate([
 *     'foo' => [
 *         'maxLength' => 16,
 *     ],
 * ])
 */
class MaxLengthRuleValidator extends SingleRuleValidator
{
    const NAME = 'maxLength';

    protected array $errorTemplates = [
        'maxLength' => 'Length of :value must be less than or equal to :max',
    ];

    public function validateSingle($value, ...$params): ?array
    {
        $maxLength = $params[0];
        $valueLength = $this->getValueLength($value);

        if ($valueLength > $maxLength) {
            return [
                'maxLength' => $this->getErrorMessage('maxLength', [
                    ':value' => $value,
                    ':max' => $maxLength,
                ]),
            ];
        }

        return null;
    }

    private function getValueLength($value): int
    {
        if (\is_array($value)) {
            return count($value);
        }

        if (\is_string($value)) {
            return strlen($value);
        }

        return 0;
    }
}
