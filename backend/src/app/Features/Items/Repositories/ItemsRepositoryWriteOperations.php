<?php

namespace App\Features\Items\Repositories;

use App\Features\Items\Dtos\CreateItemDto;

trait ItemsRepositoryWriteOperations
{
    public function create(CreateItemDto $dto): array
    {
        $sql = "
            INSERT INTO {$this->table}
                (user_id, list_id, name, amount, description)
            VALUES
                (:userid, :listid, :name, :amount, :description)
        ";

        $params = [
            ':userid' => $dto->userId,
            ':listid' => $dto->lsitId,
            ':name' => $dto->name,
            ':amount' => $dto->amount,
            ':description' => $dto->description ?? '',
        ];

        $itemId = $this->db->insert($sql, $params);

        return [
            'item_id' => $itemId,
            'list_id' => $dto->listId,
            'user_id' => $dto->userId,
            'is_done' => 0,
            'name' => $dto->name,
            'amount' => intval($dto->amount),
            'description' => $dto->description,
        ];
    }

    /**
     * @param string|int $itemId
     */
    public function markAsDone($itemId, bool $isDone): int
    {
        $sql = "
            UPDATE {$this->table}
            SET is_done = :isdone
            WHERE item_id = :itemid
        ";
        $params = [
            ':itemid' => $itemId,
            ':isdone' => $isDone ? 1 : 0,
        ];
        return $this->db->execute($sql, $params);
    }

    /**
     * @param string|int $listId
     */
    public function markAllAsDone($listId, bool $isDone): int
    {
        $sql = "
            UPDATE {$this->table}
            SET is_done = :isdone
            WHERE list_id = :listid
        ";
        $params = [
            ':listid' => $listId,
            ':isdone' => $isDone ? 1 : 0,
        ];
        return $this->db->execute($sql, $params);
    }

    /**
     * @param string|int $itemId
     */
    public function updateById($itemId, array $fields): int
    {
        $updates = [
            // Ex.: 'example_field_name = :examplefieldvalue',
        ];

        $params = [
            ':itemid' => $itemId,
        ];

        foreach ($fields as $field => $value) {
            $placeholder = ":{$field}";
            $params[$placeholder] = $value;
            $updates[] = "{$field} = {$placeholder}";
        }

        $setClause = implode(', ', $updates);

        $sql = "UPDATE {$this->table} SET {$setClause} WHERE item_id = :itemid";

        return $this->db->execute($sql, $params);
    }

    /**
     * @param string|int $itemId
     */
    public function deleteById($itemId): int
    {
        $sql = "DELETE FROM {$this->table} WHERE item_id = :itemid";
        $params = [':itemid' => $itemId];
        return $this->db->execute($sql, $params);
    }

    /**
     * @param string|int $listId
     */
    public function deleteByListId($listId): int
    {
        $sql = "DELETE FROM {$this->table} WHERE list_id = :listid";
        $params = [':listid' => $listId];
        return $this->db->execute($sql, $params);
    }

    /**
     * @param string|int $listId
     */
    public function deleteDoneItemsByListId($listId): int
    {
        $sql = "DELETE FROM {$this->table} WHERE list_id = :listid AND is_done = 1";
        $params = [':listid' => $listId];
        return $this->db->execute($sql, $params);
    }
}
