<?php

namespace App\Features\Lists\Repositories;

use App\Core\Repository;
use App\Core\Services\Database\Database;

class ListsRepository extends Repository
{
    use ListsRepositoryWriteOperations;
    use ListsRepositoryReadOperations;
    use ListsRepositoryFieldMapper;

    public string $table = 'lists';

    protected Database $db;

    public function __construct()
    {
        $this->db = appServiceProvider(Database::class);
    }
}
