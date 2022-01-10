<?php

namespace App\Features\Items\Services;

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
        $data = $this->itemsRepo->create($dtoIn);

        $dtoOut = new GetItemDto();
        $dtoOut->itemId = $data['item_id'];
        $dtoOut->userId = $data['user_id'];
        $dtoOut->listId = $data['list_id'];
        $dtoOut->name = $data['name'];
        $dtoOut->isDone = intval($data['is_done']) ? true : false;
        $dtoOut->description = $data['description'] ?? '';

        return $dtoOut;
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
        $this->itemsRepo->markAsDone($itemId, $isDone);
    }

    /**
     * @param string|int $listId
     */
    public function markAllAsDone($listId, $isDone = true): void
    {
        $this->itemsRepo->markAllAsDone($listId, $isDone);
    }

    /**
     * @param string|int $listId
     */
    public function findById($listId): array
    {
        $list = $this->itemsRepo->findById($listId);

        if ($list === null) {
            $message = "List with id #{$listId} does not exist";
            throw new NotFoundHttpException($message);
        }

        return $list;
    }

    public function updateById(UpdateItemDto $dtoIn): GetItemDto
    {
        $item = $this->findById($dtoIn->itemId);

        $fields = [];

        // TODO: Generalize?
        if (isset($dtoIn->name)) {
            $fields['name'] = $dtoIn->name;
            $item['name'] = $dtoIn->name;
        }

        if (isset($dtoIn->description)) {
            $fields['description'] = $dtoIn->description;
            $item['description'] = $dtoIn->description;
        }

        if (isset($dtoIn->amount)) {
            $fields['amount'] = $dtoIn->amount;
            $item['amount'] = $dtoIn->amount;
        }

        if (isset($dtoIn->isDone)) {
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
