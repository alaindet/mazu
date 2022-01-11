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

    /**
     * @param string|int $isFavorite
     * @return boolean
     */
    public function isFavoriteMapOut($isFavorite): bool
    {
        return intval($isFavorite) === 1;
    }
}
