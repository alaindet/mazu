<?php

namespace App\Features\Items\Middleware;

use App\Core\Exceptions\Http\BadRequestHttpException;
use App\Core\Middleware;
use App\Core\Http\Request\Request;
use App\Core\Http\Response\Response;
use App\Common\Validation\Validator;
use App\Features\Items\Dtos\UpdateItemDto;

class UpdateItemValidationMiddleware extends Middleware
{
    const TIMING = self::RUN_BEFORE;

    const VALIDATION_SCHEMA = [
        'name' => [
            'required' => false,
            'is' => 'string',
            'minLength' => 3,
        ],
        'amount' => [
            'required' => false,
            'is' => ['integer', 'string'],
            'between' => [1, 100],
        ],
        'description' => [
            'required' => false,
            'is' => 'string',
            'minLength' => 3,
        ],
        'isDone' => [
            'required' => false,
            'is' => ['boolean', 'integer'],
            'in' => [true, false, 0, 1],
        ],
    ];

    public function process(Request $req, Response $res, ...$args): Response
    {
        $body = $req->getBody();
        $listId = $req->getUriParameter('listid');
        $itemId = $req->getUriParameter('itemid');
        $validator = new Validator($body, self::VALIDATION_SCHEMA);

        if ($body === null || $listId === null || !$validator->validate()) {
            $message = 'Could not update item';
            $data = ['validation' => $validator->getErrors()];
            throw (new BadRequestHttpException($message))->setData($data);
        }

        $dto = new UpdateItemDto();
        $dto->itemId = $itemId;
        $dto->listId = $listId;
        $dto->name = $body['name'] ?? null;
        $dto->amount = isset($body['amount']) ? intval($body['amount']) : null;
        $dto->isDone = $body['isDone'] ?? null;
        $dto->description = $body['description'] ?? null;

        $req->setValidatedData(['dto' => $dto]);

        return $res;
    }
}
