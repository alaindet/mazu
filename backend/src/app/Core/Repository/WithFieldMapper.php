<?php

namespace App\Core\Repository;

use App\Common\Utils\Arrays;
use App\Common\Utils\TypeCasting;

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
    // TODO: You should be able to declare it here!
    // public array $mapperSchema = [];

    /**
     * Undocumented function
     *
     * @param array $row
     * @param TypeCasting|null $caster
     * @return array
     */
    public function map(array $row, $caster = null): array
    {
        if ($caster === null) {
            $caster = new TypeCasting();
        }

        $result = [];

        foreach ($row as $key => $value) {

            // Missing key from mapping schema
            if (!isset($this->mapperSchema[$key])) {
                $result[$key] = $value;
                continue;
            }

            $config = $this->mapperSchema[$key];

            if (is_array($config)) {
                [$mappedKey, $mapperName] = $config;

                // User-defined mapper?
                if (is_callable($mapperName)) {
                    $result[$mappedKey] = $mapperName($value);
                    continue;
                }

                // Use default type casting mapper
                $result[$mappedKey] = $caster->$mapperName($value);
                continue;
            }

            // Just map the key, not the value
            $mappedKey = $config;
            $result[$mappedKey] = $value;
        }

        return $result;
    }

    public function mapMultiple(array $rows): array
    {
        $caster = new TypeCasting();
        $result = [];

        foreach ($rows as $row) {
            $result[] = $this->map($row, $caster);
        }

        return $result;
    }

    public function toDto(string $dtoFullClassName, array $arr)
    {
        return Arrays::toDto($dtoFullClassName, $arr);
    }
}
