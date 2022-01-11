<?php

namespace App\Features\Lists\Repositories;

use App\Core\Repository;
use App\Common\Repositories\WithFieldMapper;

class ListsRepository extends Repository
{
    use ListsRepositoryWriteOperations;
    use ListsRepositoryReadOperations;
    use WithFieldMapper;

    public string $table = 'lists';
    protected $mapperSchema = [
        'list_id' => 'listId',
        'user_id' => 'userId',
        'is_favorite' => [
            'isFavorite',
            fn($i) => TypeCasting::toBoolean($i),
        ],
        'name' => 'name',
        'description' => 'description',
    ];
}
