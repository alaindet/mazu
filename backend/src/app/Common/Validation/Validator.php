<?php

namespace App\Common\Validation;

use App\Core\Exceptions\Validation\ValidationException;
use App\Common\Validation\RuleValidators\BetweenRuleValidator;
use App\Common\Validation\RuleValidators\EmailRuleValidator;
use App\Common\Validation\RuleValidators\EqualsRuleValidator;
use App\Common\Validation\RuleValidators\ExactLengthRuleValidator;
use App\Common\Validation\RuleValidators\ExceptInRuleValidator;
use App\Common\Validation\RuleValidators\ExceptRuleValidator;
use App\Common\Validation\RuleValidators\ExistsOnDatabaseRuleValidator;
use App\Common\Validation\RuleValidators\FilledRuleValidator;
use App\Common\Validation\RuleValidators\InRuleValidator;
use App\Common\Validation\RuleValidators\IsRuleValidator;
use App\Common\Validation\RuleValidators\MaxLengthRuleValidator;
use App\Common\Validation\RuleValidators\MaxRuleValidator;
use App\Common\Validation\RuleValidators\MinLengthRuleValidator;
use App\Common\Validation\RuleValidators\MinRuleValidator;
use App\Common\Validation\RuleValidators\MissingOnDatabaseRuleValidator;
use App\Common\Validation\RuleValidators\RegexRuleValidator;
use App\Common\Validation\RuleValidators\RequiredRuleValidator;

// ...

/**
 * Validates an associative array
 */
class Validator
{
    private $input = [];
    private array $errors = [];
    private array $rules;
    private array $ruleValidators = [
        'between' => BetweenRuleValidator::class,
        'email' => EmailRuleValidator::class,
        'equals' => EqualsRuleValidator::class,
        'exactLength' => ExactLengthRuleValidator::class,
        'except' => ExceptRuleValidator::class,
        'exceptIn' => ExceptInRuleValidator::class,
        'existsOnDatabase' => ExistsOnDatabaseRuleValidator::class,
        'filled' => FilledRuleValidator::class,
        'in' => InRuleValidator::class,
        'is' => IsRuleValidator::class,
        'max' => MaxRuleValidator::class,
        'maxLength' => MaxLengthRuleValidator::class,
        'min' => MinRuleValidator::class,
        'minLength' => MinLengthRuleValidator::class,
        'missingOnDatabase' => MissingOnDatabaseRuleValidator::class,
        'regex' => RegexRuleValidator::class,
        'required' => RequiredRuleValidator::class,
        // ...
    ];

    public function __construct($input = null, ?array $rules = null)
    {
        $this->input = $input;
        $this->rules = $rules;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function validate(): bool
    {
        $this->errors = [];

        if (empty($this->input)) {
            $this->errors['validation'] = 'No input provided';
            return false;
        }

        foreach ($this->rules as $inputKey => $ruleValidators) {
            foreach ($ruleValidators as $ruleName => $ruleParams) {

                $ruleValidatorClass = $this->ruleValidators[$ruleName];
                $ruleValidator = new $ruleValidatorClass($this->errors);

                if (!\is_array($ruleParams)) {
                    $ruleParams = [$ruleParams];
                }

                // Evaluate rule validator
                $ruleErrors = $ruleValidator->validate(
                    $this->input,
                    $inputKey,
                    ...$ruleParams
                );

                // Add errors
                if ($ruleErrors !== null) {

                    foreach ($ruleErrors as $ruleErrorKey => $ruleErrorMessage) {

                        if (!isset($this->errors[$inputKey])) {
                            $this->errors[$inputKey] = [];
                        }

                        $this->errors[$inputKey][$ruleErrorKey] = $ruleErrorMessage;
                    }
                }

                // Stop validation?
                if ($ruleValidator->shouldStopValidation()) {
                    return $this->errors === [];
                }
            }
        }

        return $this->errors === [];
    }
}
