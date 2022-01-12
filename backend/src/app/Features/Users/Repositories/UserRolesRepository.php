<?php

namespace App\Features\Users\Repositories;

use App\Core\Repository\Repository;
use App\Core\Services\Database\Database;

class UserRolesRepository extends Repository
{
    const TABLE = 'user_roles';

    const ADMIN = 1;
    const USER = 2;

    protected Database $db;

    public function __construct()
    {
        $this->db = appServiceProvider(Database::class);
    }
}
