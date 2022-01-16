<?php

namespace App\Core\Repository;

use App\Core\Services\Database\Database;

abstract class Repository
{
    protected Database $db;

    public function __construct()
    {
        $this->db = appServiceProvider(Database::class);
    }
}
