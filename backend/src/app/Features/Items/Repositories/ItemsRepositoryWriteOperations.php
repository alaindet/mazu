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
     * @param string|int $listId
     */
    public function markAsDone($listId, bool $isDone): void
    {
        // ...
    }

    /**
     * @param string|int $listId
     */
    public function markAllAsDone($listId, bool $isDone): void
    {
        // ...
    }

    /**
     * @param string|int $itemId
     */
    public function updateById($itemId, array $fields): int
    {
        return 1;
    }

    /**
     * @param string|int $itemId
     */
    public function deleteById($itemId): int
    {
        return 1;
    }

    /**
     * @param string|int $listId
     */
    public function deleteByListId($listId): int
    {
        return 1;
    }

    /**
     * @param string|int $listId
     */
    public function deleteDoneItemsByListId($listId): int
    {
        return 1;
    }
}
