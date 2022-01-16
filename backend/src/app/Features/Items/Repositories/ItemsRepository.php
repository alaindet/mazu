<?php

namespace App\Features\Items\Repositories;

use App\Core\Repository\Repository;
use App\Core\Repository\WithFieldMapper;
use App\Common\Utils\TypeCasting;

class ItemsRepository extends Repository
{
    use ItemsRepositoryWriteOperations;
    use ItemsRepositoryReadOperations;
    use WithFieldMapper;

    public string $table = 'items';
    protected array $mapperSchema = [
        'item_id' => 'itemId',
        'user_id' => 'userId',
        'list_id' => 'listId',
        'name' => 'name',
        'amount' => ['amount', TypeCasting::TO_INTEGER],
        'description' => 'description',
        'is_done' => ['isDone', TypeCasting::TO_BOOLEAN],
    ];
}
