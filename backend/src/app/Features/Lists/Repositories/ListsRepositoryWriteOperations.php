<?php

namespace App\Features\Lists\Repositories;

use App\Features\Lists\Dtos\CreateListDto;

trait ListsRepositoryWriteOperations
{
    public function create(CreateListDto $dto): array
    {
        $sql = "
            INSERT INTO {$this->table}
                (user_id, is_favorite, name, description)
            VALUES
                (:userid, :isfavorite, :name, :description)
        ";

        $params = [
            ':userid' => $dto->userId,
            ':isfavorite' => 0,
            ':name' => $dto->name,
            ':description' => $dto->description,
        ];

        $listId = $this->db->insert($sql, $params);

        return [
            'list_id' => $listId,
            'user_id' => $dto->userId,
            'is_favorite' => 0,
            'name' => $dto->name,
            'description' => $dto->description,
        ];
    }


    /**
     * @param string|integer $listId
     * @param boolean $isFavorite
     * @return array
     */
    public function markAsFavorite($listId, $isFavorite = true): int
    {
        $sql = "
            UPDATE {$this->table}
            SET is_favorite = :isfavorite
            WHERE list_id = :listid
        ";
        $params = [
            ':listid' => $listId,
            ':isfavorite' => $isFavorite ? 1 : 0,
        ];
        return $this->db->execute($sql, $params);
    }

    /**
     * @param string|integer $listId
     * @param array $fields
     * @return integer
     */
    public function updateById($listId, array $fields): int
    {
        $updates = [
            // Ex.: 'example_field_name = :examplefieldvalue',
        ];

        $params = [
            ':listid' => $listId,
        ];

        foreach ($fields as $field => $value) {
            $placeholder = ":{$field}";
            $params[$placeholder] = $value;
            $updates[] = "{$field} = {$placeholder}";
        }

        $setClause = implode(', ', $updates);

        $sql = "UPDATE {$this->table} SET {$setClause} WHERE list_id = :listid";

        return $this->db->execute($sql, $params);
    }

    /**
     * @param string|integer $listId
     * @return integer
     */
    public function deleteById($listId): int
    {
        $sql = "DELETE FROM {$this->table} WHERE list_id = :listid";
        $params = [':listid' => $listId];
        return $this->db->execute($sql, $params);
    }
}
