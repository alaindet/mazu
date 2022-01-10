<?php

namespace App\Features\Users\Repositories;

use App\Core\Repository;
use App\Features\Authentication\Dtos\SignUpUserDto;
use App\Core\Services\Database\Database;

class UsersRepository extends Repository
{
    protected $table = 'users';
    protected Database $db;

    public function __construct()
    {
        $this->db = appServiceProvider(Database::class);
    }

    public function createUser(SignUpUserDto $dto): int
    {
        $sql = "
            INSERT INTO {$this->table}
                (first_name, last_name, user_role_id, email, password)
            VALUES
                (:firstname, :lastname, :roleid, :email, :password)
        ";

        $params = [
            ':firstname' => $dto->firstName,
            ':lastname' => $dto->lastName,
            ':roleid'=> $dto->roleId,
            ':email' => $dto->email,
            ':password' => $dto->password,
        ];

        $userId = $this->db->insert($sql, $params);

        return $userId;
    }

    /**
     * @param string|int $userId
     * @return array|null
     */
    public function getUserProfile($userId)
    {
        $sql = "
            SELECT
                u.user_id,
                u.created_on,
                u.first_name,
                u.last_name,
                ur.name AS role,
                u.email
            FROM
                {$this->table} AS u
                    INNER JOIN user_roles AS ur
                    ON u.user_role_id = ur.user_role_id
            WHERE
                u.user_id = :userid
        ";

        $params = [':userid' => $userId];

        return $this->db->selectFirst($sql, $params);
    }

    /**
     * @param string $email
     * @param string|array $_fields
     * @return array |null
     */
    public function findUserByEmail(string $email, $_fields = '*')
    {
        $fields = \is_array($_fields)
            ? \implode(',', $_fields)
            : $_fields;

        $sql = "SELECT {$fields} FROM {$this->table} WHERE email = :email";
        $params = [':email' => $email];

        return $this->db->selectFirst($sql, $params);
    }
}
