<?php

namespace App\Features\Lists\Repositories;

trait ListsRepositoryFieldMapper
{
    // snake_case => [camel_case, mapper_function],
    // snake_case => camel_case
    private array $output = [
        'list_id' => 'listId',
        'user_id' => 'userId',
        'is_favorite' => ['isFavorite', 'isFavoriteMapOut'],
        // 'name' => 'name',
        // 'description' => 'description',
    ];

    // TODO: Move in common file
    public function outputSingle(array $row): array
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

    // TODO: Move in common file
    public function outputMultiple(array $rows): array
    {
        $result = [];

        foreach ($rows as $row) {
            $result[] = $this->outputSingle($row);
        }

        return $result;
    }

    /**
     * @param string|int $isFavorite
     * @return boolean
     */
    public function isFavoriteMapOut($isFavorite): bool
    {
        return intval($isFavorite) === 1;
    }
}
