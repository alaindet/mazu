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
            'message' => "New item created on list #{$dtoIn->listId}",
            'data' => $dtoOut,
        ]);

        return $res;
    }

    public function getAll(Request $req, Response $res): Response
    {
        $dtoIn = $req->getValidatedData('dto');
        $items = $this->itemsService->getAllByListId($listId);

        $res->setBody([
            'message' => "All items of list #{$dtoIn->listId}",
            'data' => $items,
        ]);

        return $res;
    }

    public function markAsDone(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $itemId = $req->getUriParameter('itemid');
        $list = $this->listsService->markAsDone($itemId, true);
        $res->setBody([
            'message' => "Item #{$itemId} from list #{$listId} marked as 'done'",
            'data' => $list,
        ]);

        return $res;
    }

    public function unmarkAsDone(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $itemId = $req->getUriParameter('itemid');
        $list = $this->listsService->markAsDone($itemId, false);
        $res->setBody([
            'message' => "Item #{$itemId} from list #{$listId} marked as 'todo'",
            'data' => $list,
        ]);

        return $res;
    }

    public function update(Request $req, Response $res): Response
    {
        $dtoIn = $req->getValidatedData('dto');
        $dtoOut = $this->listsService->updateById($dtoIn);

        $res->setBody([
            'message' => "List #{$dtoOut->listId} updated",
            'data' => $dtoOut,
        ]);

        return $res;
    }

    public function delete(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $dtoOut = $this->listsService->deleteById($listId);

        $res->setBody([
            'message' => "List #{$listId} deleted",
            'data' => $dtoOut,
        ]);

        return $res;
    }
}
