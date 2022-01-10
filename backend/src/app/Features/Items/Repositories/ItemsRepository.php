<?php

namespace App\Features\Items\Repositories;

use App\Core\Repository;
use App\Core\Services\Database\Database;

class ItemsRepository extends Repository
{
    use ItemsRepositoryWriteOperations;
    use ItemsRepositoryReadOperations;

    public string $table = 'items';

    protected Database $db;

    public function __construct()
    {
        $this->db = appServiceProvider(Database::class);
    }
}
