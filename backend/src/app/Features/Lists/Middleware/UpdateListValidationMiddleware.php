<?php

namespace App\Features\Lists\Middleware;

use App\Core\Exceptions\Http\BadRequestHttpException;
use App\Core\Middleware;
use App\Core\Http\Request\Request;
use App\Core\Http\Response\Response;
use App\Shared\Validation\Validator;
use App\Features\Lists\Dtos\UpdateListDto;

class UpdateListValidationMiddleware extends Middleware
{
    const TIMING = self::RUN_BEFORE;

    const VALIDATION_SCHEMA = [
        'name' => [
            'required' => false,
            'is' => 'string',
            'minLength' => 5,
        ],
        'description' => [
            'required' => false,
            'is' => 'string',
            'minLength' => 5,
        ],
    ];

    public function process(Request $req, Response $res, ...$args): Response
    {
        $body = $req->getBody();
        $listId = $req->getUriParameter('listid');
        $validator = new Validator($body, self::VALIDATION_SCHEMA);

        if ($body === null || $listId === null || !$validator->validate()) {
            $message = 'Could not update list';
            $data = ['validation' => $validator->getErrors()];
            throw (new BadRequestHttpException($message))->setData($data);
        }

        $dto = new UpdateListDto();
        $dto->listId = $listId;
        $dto->name = $body['name'];
        $dto->isFavorite = $body['isFavorite'];
        $dto->description = $body['description'] ?? null;

        $req->setValidatedData(['dto' => $dto]);

        return $res;
    }
}
