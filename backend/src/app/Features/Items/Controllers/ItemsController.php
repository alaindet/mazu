<?php

namespace App\Features\Items\Controllers;

use App\Core\Controller;
use App\Core\Http\Request\Request;
use App\Core\Http\Response\Response;
use App\Features\Items\Services\ItemsService;

class ItemsController extends Controller
{
    private ItemsService $itemsService;

    public function __construct()
    {
        $this->itemsService = new ItemsService();
    }

    public function create(Request $req, Response $res): Response
    {
        $dtoIn = $req->getValidatedData('dto');
        $dtoOut = $this->itemsService->create($dtoIn);

        $res->setBody([
            'message' => "New item was created on list #{$dtoIn->listId}",
            'data' => $dtoOut,
        ]);

        return $res;
    }

    public function getAll(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $items = $this->itemsService->getAllByListId($listId);

        $res->setBody([
            'message' => "Get all items of list #{$listId}",
            'data' => $items,
        ]);

        return $res;
    }

    public function markAsDone(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $itemId = $req->getUriParameter('itemid');
        $this->itemsService->markAsDone($itemId, true);
        $res->setBody([
            'message' => "Item #{$itemId} from list #{$listId} was marked as done",
            'data' => null,
        ]);

        return $res;
    }

    public function markAllAsDone(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $this->itemsService->markAllAsDone($listId, true);
        $res->setBody([
            'message' => "All items from list #{$listId} were marked as done",
            'data' => null,
        ]);

        return $res;
    }

    public function unmarkAsDone(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $itemId = $req->getUriParameter('itemid');
        $list = $this->itemsService->markAsDone($itemId, false);
        $res->setBody([
            'message' => "Item #{$itemId} from list #{$listId} was marked as to do",
            'data' => $list,
        ]);

        return $res;
    }

    public function unmarkAllAsDone(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $this->itemsService->markAllAsDone($listId, false);
        $res->setBody([
            'message' => "All items from list #{$listId} were marked as to do",
            'data' => null,
        ]);

        return $res;
    }

    public function update(Request $req, Response $res): Response
    {
        [$listId, $itemId] = $req->getUriParameters(['listid', 'itemid']);
        $dtoIn = $req->getValidatedData('dto');
        $dtoOut = $this->itemsService->updateById($dtoIn);

        $res->setBody([
            'message' => "Item #{$itemId} from list #{$listId} was updated",
            'data' => $dtoOut,
        ]);

        return $res;
    }

    public function delete(Request $req, Response $res): Response
    {
        [$listId, $itemId] = $req->getUriParameters(['listid', 'itemid']);
        $dtoOut = $this->itemsService->deleteById($itemId);

        $res->setBody([
            'message' => "Item #{$itemId} from list #{$itemId} was deleted",
            'data' => $dtoOut,
        ]);

        return $res;
    }

    public function deleteAll(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $dtoOut = $this->itemsService->deleteByListId($listId);

        $res->setBody([
            'message' => "All items from list #{$listId} were deleted",
            'data' => $dtoOut,
        ]);

        return $res;
    }

    public function deleteAllMarkedAsDone(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $dtoOut = $this->itemsService->deleteDoneItemsByListId($listId);

        $res->setBody([
            'message' => "All items marked as done were deleted from list #{$listId}",
            'data' => $dtoOut,
        ]);

        return $res;
    }
}
