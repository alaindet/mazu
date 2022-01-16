<?php

namespace App\Features\Lists\Repositories;

use App\Core\Repository\Repository;
use App\Core\Repository\WithFieldMapper;
use App\Common\Utils\TypeCasting;

class ListsRepository extends Repository
{
    use ListsRepositoryWriteOperations;
    use ListsRepositoryReadOperations;
    use WithFieldMapper;

    public string $table = 'lists';
    public array $mapperSchema = [
        'list_id' => 'listId',
        'user_id' => 'userId',
        'is_favorite' => ['isFavorite', TypeCasting::TO_BOOLEAN],
        'name' => 'name',
        'description' => 'description',
    ];
}
