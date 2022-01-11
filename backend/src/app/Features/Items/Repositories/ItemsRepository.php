<?php

namespace App\Features\Items\Repositories;

use App\Core\Repository;
use App\Common\Repositories\WithFieldMapper;

class ItemsRepository extends Repository
{
    use ItemsRepositoryWriteOperations;
    use ItemsRepositoryReadOperations;
    use WithFieldMapper;

    public string $table = 'items';
    protected $mapperSchema = [
        'item_id' => 'itemId',
        'user_id' => 'userId',
        'list_id' => 'listId',
        'name' => 'name',
        'amount' => [
            'amount',
            fn($i) => TypeCasting::toInteger($i),
        ],
        'description' => 'description',
        'is_done' => [
            'isDone',
            fn($i) => TypeCasting::toBoolean($i),
        ],
    ];
}
