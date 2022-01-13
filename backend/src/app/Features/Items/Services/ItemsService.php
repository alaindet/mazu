<?php

namespace App\Features\Items\Services;

use App\Core\Exceptions\Database\DatabaseException;
use App\Core\Exceptions\Http\ConflictHttpException;
use App\Core\Exceptions\Http\InternalServerErrorHttpException;
use App\Core\Exceptions\Http\NotFoundHttpException;
use App\Features\Items\Dtos\CreateItemDto;
use App\Features\Items\Dtos\UpdateItemDto;
use App\Features\Items\Dtos\GetItemDto;
use App\Features\Items\Repositories\ItemsRepository;

class ItemsService
{
    private ItemsRepository $itemsRepo;

    public function __construct()
    {
        $this->itemsRepo = new ItemsRepository();
    }

    public function create(CreateItemDto $dtoIn): GetItemDto
    {
        try {
            return $this->itemsRepo->create($dtoIn);
        } catch (DatabaseException $e) {
            throw new ConflictHttpException(
                "Item with name \"{$dtoIn->name}\" already exists " .
                "on list #{$dtoIn->listId}"
            );
        }
    }

    /**
     * @param string|int $listId
     */
    public function getAllByListId($listId): array
    {
        return $this->itemsRepo->getAllByListId($listId);
    }

    /**
     * @param string|int $itemId
     */
    public function markAsDone($itemId, $isDone = true): void
    {
        $marked = $this->itemsRepo->markAsDone($itemId, $isDone);

        if ($marked === 0) {
            $message = "Item #{$itemId} does not exist";
            throw new NotFoundHttpException($message);
        }
    }

    /**
     * @param string|int $listId
     */
    public function markAllAsDone($listId, $isDone = true): void
    {
        $marked = $this->itemsRepo->markAllAsDone($listId, $isDone);
        if ($marked === 0) {
            $message = "Items from list #{$listId} do not exist";
            throw new NotFoundHttpException($message);
        }
    }

    /**
     * @param string|int $itemId
     */
    public function findById($itemId): array
    {
        $list = $this->itemsRepo->findById($itemId);

        if ($list === null) {
            $message = "Item #{$itemId} does not exist";
            throw new NotFoundHttpException($message);
        }

        return $list;
    }

    public function updateById(UpdateItemDto $dtoIn): GetItemDto
    {
        $item = $this->findById($dtoIn->itemId);

        $fields = [];

        // TODO: Generalize?
        if ($dtoIn->name !== null) {
            $fields['name'] = $dtoIn->name;
            $item['name'] = $dtoIn->name;
        }

        if ($dtoIn->description !== null) {
            $fields['description'] = $dtoIn->description;
            $item['description'] = $dtoIn->description;
        }

        if ($dtoIn->amount !== null) {
            $fields['amount'] = $dtoIn->amount;
            $item['amount'] = $dtoIn->amount;
        }

        if ($dtoIn->isDone !== null) {
            $fields['is_done'] = $dtoIn->isDone;
            $item['is_done'] = $dtoIn->isDone;
        }

        $updated = $this->itemsRepo->updateById($dtoIn->itemId, $fields);

        if ($updated === 0) {
            $message = "Could not update item #{$dtoIn->itemId} from list #{$dtoIn->listId}";
            throw new InternalServerErrorHttpException($message);
        }

        $dtoOut = new GetItemDto();
        $dtoOut->itemId = $item['item_id'];
        $dtoOut->listId = $item['list_id'];
        $dtoOut->userId = $item['user_id'];
        $dtoOut->isFavorite = intval($item['is_done']) === 1 ? true : false;
        $dtoOut->name = $item['name'];
        $dtoOut->description = $item['description'] ?? '';
        $dtoOut->amount = $item['amount'];

        return $dtoOut;
    }

    /**
     * @param string|int $itemId
     */
    public function deleteById($itemId): GetItemDto
    {
        $item = $this->findById($itemId);

        $deleted = $this->itemsRepo->deleteById($itemId);

        if ($deleted === 0) {
            $message = "Could not update item #{$itemId}";
            throw new InternalServerErrorHttpException($message);
        }

        $dtoOut = new GetItemDto();
        $dtoOut->itemId = $item['item_id'];
        $dtoOut->listId = $item['list_id'];
        $dtoOut->userId = $item['user_id'];
        $dtoOut->isFavorite = intval($item['is_done']) === 1 ? true : false;
        $dtoOut->name = $item['name'];
        $dtoOut->amount = $item['amount'];
        $dtoOut->description = $item['description'] ?? '';

        return $dtoOut;
    }

    /**
     * @param string|int $listId
     */
    public function deleteByListId($listId): void
    {
        $this->itemsRepo->deleteByListId($listId);
    }

    /**
     * @param string|int $listId
     */
    public function deleteDoneItemsByListId($listId): void
    {
        $this->itemsRepo->deleteDoneItemsByListId($listId);
    }
}
