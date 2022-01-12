<?php

namespace App\Features\Lists\Repositories;

use App\Features\Lists\Dtos\GetListDto;

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
     * @return GetListDto|null
     */
    public function findById($listId): ?GetListDto
    {
        $sql = "SELECT * FROM {$this->table} WHERE list_id = :listId";
        $params = [':listId' => $listId];
        $result = $this->db->selectFirst($sql, $params);
        if ($result === null) {
            return null;
        }

        return $this->toDto(GetListDto::class, $this->map($result));
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
