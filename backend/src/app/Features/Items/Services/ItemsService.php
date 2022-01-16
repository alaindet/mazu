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
            $markStatus = $isDone ? 'marked' : 'not marked';
            $message = "Item #{$itemId} is already {$markStatus} as done";
            throw new ConflictHttpException($message);
        }
    }

    /**
     * @param string|int $listId
     */
    public function markAllAsDone($listId, $isDone = true): void
    {
        $marked = $this->itemsRepo->markAllAsDone($listId, $isDone);
        if ($marked === 0) {
            $markStatus = $isDone ? 'marked' : 'unmarked';
            $message = "No items from list #{$listId} were {$markStatus} as done";
            throw new NotFoundHttpException($message);
        }
    }

    /**
     * @param string|int $itemId
     */
    public function findById($itemId): ?GetItemDto
    {
        $item = $this->itemsRepo->findById($itemId);

        if ($item === null) {
            $message = "Item #{$itemId} does not exist";
            throw new NotFoundHttpException($message);
        }

        return $item;
    }

    public function updateById(UpdateItemDto $dtoIn): GetItemDto
    {
        $dtoOut = $this->findById($dtoIn->itemId);

        $fields = [];

        // TODO: Generalize?
        if ($dtoIn->name !== null) {
            $fields['name'] = $dtoIn->name;
            $dtoOut->name = $dtoIn->name;
        }

        if ($dtoIn->description !== null) {
            $fields['description'] = $dtoIn->description;
            $dtoOut->description = $dtoIn->description;
        }

        if ($dtoIn->amount !== null) {
            $fields['amount'] = $dtoIn->amount;
            $dtoOut->amount = $dtoIn->amount;
        }

        if ($dtoIn->isDone !== null) {
            $fields['is_done'] = $dtoIn->isDone;
            $dtoOut->isDone = $dtoIn->isDone;
        }

        $updated = $this->itemsRepo->updateById($dtoIn->itemId, $fields);

        if ($updated === 0) {
            $message = "Could not update item #{$dtoIn->itemId} from list #{$dtoIn->listId}";
            throw new InternalServerErrorHttpException($message);
        }

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

        return $item;
    }

    /**
     * @param string|int $listId
     */
    public function deleteByListId($listId): void
    {
        $deleted = $this->itemsRepo->deleteByListId($listId);

        if ($deleted === 0) {
            $message = "Could not delete all items from list #{$listId}";
            throw new NotFoundHttpException($message);
        }
    }

    /**
     * @param string|int $listId
     */
    public function deleteDoneItemsByListId($listId): void
    {
        $deleted = $this->itemsRepo->deleteDoneItemsByListId($listId);

        if ($deleted === 0) {
            $message = "Could not delete all items marked as done from list #{$listId}";
            throw new NotFoundHttpException($message);
        }
    }
}
