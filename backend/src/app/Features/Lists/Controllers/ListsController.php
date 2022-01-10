<?php

namespace App\Features\Lists\Controllers;

use App\Core\Controller;
use App\Core\Http\Request\Request;
use App\Core\Http\Response\Response;
use App\Features\Lists\Services\ListsService;

class ListsController extends Controller
{
    private ListsService $listsService;

    public function __construct()
    {
        $this->listsService = new ListsService();
    }

    public function create(Request $req, Response $res): Response
    {
        $dtoIn = $req->getValidatedData('dto');
        $dtoOut = $this->listsService->create($dtoIn);

        $res->setBody([
            'message' => 'New list created',
            'data' => $dtoOut,
        ]);

        return $res;
    }

    public function getAll(Request $req, Response $res): Response
    {
        $authData = $req->getAuthenticationData();
        $userId = $authData['user_id'];
        $lists = $this->listsService->getAllByUserId($userId);

        $res->setBody([
            'message' => "All lists of user #{$userId}",
            'data' => $lists,
        ]);

        return $res;
    }

    public function getById(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $list = $this->listsService->findById($listId);

        $res->setBody([
            'message' => "Get list #{$listId} data",
            'data' => $list,
        ]);

        return $res;
    }

    public function markAsFavorite(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $list = $this->listsService->markAsFavorite($listId, true);
        $res->setBody([
            'message' => "List #{$listId} marked as favorite",
            'data' => $list,
        ]);

        return $res;
    }

    public function unmarkAsFavorite(Request $req, Response $res): Response
    {
        $listId = $req->getUriParameter('listid');
        $list = $this->listsService->markAsFavorite($listId, false);
        $res->setBody([
            'message' => "List #{$listId} unmarked as favorite",
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
