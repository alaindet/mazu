<?php

namespace App\Features\Lists\Repositories;

trait ListsRepositoryReadOperations
{
    /**
     * @param string|int $userId
     * @return array
     */
    public function getAllByUserId($userId): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE user_id = :userid";
        $params = [':userid' => $userId];
        $results = $this->db->select($sql, $params);
        return $this->mapMultiple($results);
    }

    /**
     * @param string|int $listId
     * @return array|null
     */
    public function findById($listId)
    {
        $sql = "SELECT * FROM {$this->table} WHERE list_id = :listId";
        $params = [':listId' => $listId];
        $result = $this->db->selectFirst($sql, $params);
        return $this->map($result);
    }

    /**
     * @param string|int $courseId
     * @return boolean
     */
    public function existsById($listId): bool
    {
        $sql = "SELECT list_id FROM {$this->table} WHERE list_id = :listid";
        $params = [':listid' => $listId];
        $result = $this->db->selectFirst($sql, $params) !== null;
        return $this->map($result);
    }
}
