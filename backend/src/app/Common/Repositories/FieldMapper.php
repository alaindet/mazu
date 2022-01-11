<?php

namespace App\Common\Repositories;

class FieldMapper
{
    /**
     * Ex.:
     * [
     *    'name' => 'name',
     *    'is_done' => ['isDone', TypeCasting::toBoolean],
     *    'amount' => ['amount', TypeCasting::toInteger],
     * ]
     */
    private array $schema = [];

    public function map(array $row): array
    {
        $result = [];

        foreach ($row as $key => $value) {
            if (!isset($this->output[$key])) {
                $result[$key] = $value;
                continue;
            }

            $config = $this->output[$key];

            if (is_array($config)) {
                [$mappedKey, $mapperName] = $config;
                $mapper = $this[$mapperName];
                $result[$mappedKey] = $mapper($value);
                continue;
            }

            $mappedKey = $config;
            $result[$mappedKey] = $value;
        }

        return $result;
    }

    public function mapMultiple(array $rows): array
    {
        $result = [];

        foreach ($rows as $row) {
            $result[] = $this->outputSingle($row);
        }

        return $result;
    }
}
