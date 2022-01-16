<?php

namespace App\Common\Utils;

class TypeCasting
{
    const TO_BOOLEAN = 'toBoolean';
    const TO_INTEGER = 'toInteger';

    /**
     * @param string|int|double|bool $input
     * @return boolean
     */
    public function toBoolean($input): bool
    {
        switch (gettype($input)) {
            case 'boolean':
                return $input;
            case 'integer':
            case 'double':
                return $input > 0;
            case 'string':
                return $input !== '';
        }
    }

    /**
     * @param string|int|bool $input
     * @return integer
     */
    static public function toInteger($input): int
    {
        return intval($input);
    }
}
