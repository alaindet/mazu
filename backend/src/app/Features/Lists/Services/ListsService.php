<?php

namespace App\Features\Lists\Services;

use App\Core\Exceptions\Http\InternalServerErrorHttpException;
use App\Core\Exceptions\Http\NotFoundHttpException;
use App\Features\Lists\Dtos\CreateListDto;
use App\Features\Lists\Dtos\UpdateListDto;
use App\Features\Lists\Dtos\GetListDto;
use App\Features\Lists\Repositories\ListsRepository;
use App\Shared\Utils\Time;

class ListsService
{
    private ListsRepository $listsRepo;

    public function __construct()
    {
        $this->listsRepo = new ListsRepository();
    }

    public function create(CreateCourseDto $dtoIn): GetListDto
    {
        $data = $this->listsRepo->create($dtoIn);

        $dtoOut = new GetListDto();
        $dtoOut->listId = $data['list_id'];
        $dtoOut->userId = $data['user_id'];
        $dtoOut->isFavorite = intval($data['is_favorite']) ? true : false;
        $dtoOut->name = $data['name'];
        $dtoOut->description = $data['description'];

        return $dtoOut;
    }

    /**
     * @param string | int $userId
     */
    public function getAllByUserId($userId): array
    {
        return $this->listsRepo->getAllByUserId($userId);
    }

    /**
     * @param string | int $listId
     */
    public function findById($listId): array
    {
        $list = $this->listsRepo->findById($listId);

        if ($list === null) {
            $message = "List with id #{$listId} does not exist";
            throw new NotFoundHttpException($message);
        }

        return $list;
    }

    /**
     * @param string | int $listId
     */
    public function existsById($listId): bool
    {
        return $this->listsRepo->existsById($listId);
    }

    /**
     * @param string | int $listId
     */
    public function markAsFavorite($listId, $isFavorite = true): array
    {
        return $this->listsRepo->markAsFavorite($listId, $isFavorite);
    }

    public function updateById(UpdateListDto $dtoIn): GetListDto
    {
        $list = $this->findById($dtoIn->listId);

        $fields = [];

        if (isset($dtoIn->name)) {
            $fields['name'] = $dtoIn->name;
            $list['name'] = $dtoIn->name;
        }

        if (isset($dtoIn->description)) {
            $fields['description'] = $dtoIn->description;
            $list['description'] = $dtoIn->description;
        }

        $updated = $this->listsRepo->updateById($dtoIn->listId, $fields);

        if ($updated === 0) {
            $message = "Could not update list with id #{$dtoIn->listId}";
            throw new InternalServerErrorHttpException($message);
        }

        $dtoOut = new GetListDto();
        $dtoOut->listId = $list['list_id'];
        $dtoOut->userId = $list['user_id'];
        $dtoOut->isFavorite = intval($list['is_favorite']) ? true : false;
        $dtoOut->name = $list['name'];
        $dtoOut->description = $list['description'];

        return $dtoOut;
    }

    /**
     * @param string | int $listId
     */
    public function deleteById($listId): GetListDto
    {
        $list = $this->findById($listId);

        $deleted = $this->listsRepo->deleteById($list);

        if ($deleted === 0) {
            $message = "Could not update list with id #{$listId}";
            throw new InternalServerErrorHttpException($message);
        }

        $dtoOut = new GetListDto();
        $dtoOut->listId = $course['list_id'];
        $dtoOut->userId = $course['user_id'];
        $dtoOut->isFavorite = intval($list['is_favorite']) ? true : false;
        $dtoOut->name = $course['name'];
        $dtoOut->description = $course['description'];

        return $dtoOut;
    }

    public function searchByName(string $listName): array
    {
        return $this->listsRepo->searchByName($listName);
    }
}
