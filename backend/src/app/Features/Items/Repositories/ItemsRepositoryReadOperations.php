<?php

namespace App\Features\Items\Repositories;

use App\Features\Items\Dtos\GetItemDto;

trait ItemsRepositoryReadOperations
{
    /**
     * @param string|int $listId
     */
    public function getAllByListId($listId): array
    {
        $sql = "SELECT * FROM {$this->table} WHERE list_id = :listid";
        $params = [':listid' => $listId];
        $result = $this->db->select($sql, $params);
        return $this->mapMultiple($result);
    }

    /**
     * @param string|int $itemId
     */
    public function findById($itemId): ?GetItemDto
    {
        $sql = "SELECT * FROM {$this->table} WHERE item_id = :itemid";
        $params = [':itemid' => $itemId];
        $result = $this->db->selectFirst($sql, $params);

        if ($result === null) {
            return  null;
        }

        return $this->toDto(GetItemDto::class, $this->map($result));
    }
}
