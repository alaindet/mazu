<?php

namespace App\Common\Utils;

trait GetterSetter
{
    protected function getOrSet(string $key, $val)
    {
        if (!isset($val)) {
            return $this->$key;
        }

        $this->$key = $val;
        return $this;
    }
}
