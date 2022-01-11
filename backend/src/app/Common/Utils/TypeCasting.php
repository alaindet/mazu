<?php

namespace App\Common\Utils;

abstract class TypeCasting
{
    /**
     * @param string|int|double|bool $input
     * @return boolean
     */
    static public function toBoolean($input): bool
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
