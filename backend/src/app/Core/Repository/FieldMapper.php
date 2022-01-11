<?php

namespace App\Core\Repository;

use App\Common\Utils\Arrays;

trait WithFieldMapper
{
    /**
     * Ex.:
     * [
     *    'name' => 'name',
     *    'is_done' => ['isDone', fn($i) => TypeCasting::toBoolean($i)],
     *    'amount' => ['amount', fn($i) => TypeCasting::toInteger($i)],
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
            $result[] = $this->map($row);
        }

        return $result;
    }

    public function toDto(string $dtoFullClassName, array $arr)
    {
        return Arrays::toDto($dtoFullClassName, $arr);
    }
}
