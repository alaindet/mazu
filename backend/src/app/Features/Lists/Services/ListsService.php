<?php

namespace App\Features\Lists\Services;

use App\Core\Exceptions\Database\DatabaseException;
use App\Core\Exceptions\Http\ConflictHttpException;
use App\Core\Exceptions\Http\InternalServerErrorHttpException;
use App\Core\Exceptions\Http\NotFoundHttpException;
use App\Features\Lists\Dtos\CreateListDto;
use App\Features\Lists\Dtos\UpdateListDto;
use App\Features\Lists\Dtos\GetListDto;
use App\Features\Lists\Repositories\ListsRepository;

class ListsService
{
    private ListsRepository $listsRepo;

    public function __construct()
    {
        $this->listsRepo = new ListsRepository();
    }

    public function create(CreateListDto $dtoIn): GetListDto
    {
        try {
            return $this->listsRepo->create($dtoIn);
        } catch (DatabaseException $e) {
            throw new ConflictHttpException(
                "List with name \"{$dtoIn->name}\" already exists"
            );
        }
    }

    /**
     * @param string|int $userId
     */
    public function getAllByUserId($userId): array
    {
        return $this->listsRepo->getAllByUserId($userId);
    }

    /**
     * @param string|int $listId
     * @return GetListDto|null
     */
    public function findById($listId): ?GetListDto
    {
        $list = $this->listsRepo->findById($listId);

        if ($list === null) {
            $message = "List with id #{$listId} does not exist";
            throw new NotFoundHttpException($message);
        }

        return $list;
    }

    /**
     * @param string|int $listId
     */
    public function existsById($listId): bool
    {
        return $this->listsRepo->existsById($listId);
    }

    /**
     * @param string|int $listId
     */
    public function markAsFavorite($listId, $isFavorite = true)
    {
        $marked = $this->listsRepo->markAsFavorite($listId, $isFavorite);

        if ($marked === 0) {
            $markStatus = $isFavorite ? 'marked' : 'not marked';
            $message = "List #{$listId} is already {$markStatus} as favorite";
            throw new ConflictHttpException($message);
        }
    }

    public function updateById(UpdateListDto $dtoIn): GetListDto
    {
        $dtoOut = $this->findById($dtoIn->listId);

        $fields = [];

        if ($dtoIn->name !== null) {
            $fields['name'] = $dtoIn->name;
            $dtoOut->name = $dtoIn->name;
        }

        if ($dtoIn->isFavorite !== null) {
            $fields['is_favorite'] = $dtoIn->isFavorite;
            $dtoOut->isFavorite = $dtoIn->isFavorite;
        }

        if ($dtoIn->description !== null) {
            $fields['description'] = $dtoIn->description;
            $dtoOut->description = $dtoIn->description;
        }

        $updated = $this->listsRepo->updateById($dtoIn->listId, $fields);

        if ($updated === 0) {
            $message = "Could not update list #{$dtoIn->listId}";
            throw new InternalServerErrorHttpException($message);
        }

        return $dtoOut;
    }

    /**
     * @param string|int $listId
     */
    public function deleteById($listId): GetListDto
    {
        $dtoOut = $this->findById($listId);

        $deleted = $this->listsRepo->deleteById($listId);

        if ($deleted === 0) {
            $message = "Could not update list with id #{$listId}";
            throw new InternalServerErrorHttpException($message);
        }

        return $dtoOut;
    }
}
