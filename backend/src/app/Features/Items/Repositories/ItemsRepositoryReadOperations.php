<?php

namespace App\Features\Items\Repositories;

trait ItemsRepositoryReadOperations
{
    /**
     * @param string|int $listId
     */
    public function getAllByListId($listId): array
    {
        return [];
    }

    /**
     * @param string|int $listId
     */
    public function findById($listId): array
    {
        return [];
    }
}
