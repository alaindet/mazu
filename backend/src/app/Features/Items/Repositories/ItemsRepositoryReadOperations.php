<?php

namespace App\Features\Items\Repositories;

trait ItemsRepositoryReadOperations
{
    /**
     * @param string|int $listId
     */
    public function getAllByListId($listId): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE list_id = :listid";
        $params = [':listid' => $listId];
        $result = $this->db->selectFirst($sql, $params);
        return $this->map($result);
    }

    /**
     * @param string|int $itemId
     */
    public function findById($itemId): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE item_id = :itemid";
        $params = [':itemid' => $itemId];
        $result = $this->db->selectFirst($sql, $params);
        return $this->map($result);
    }
}
