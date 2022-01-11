<?php

namespace App\Features\Items\Middleware;

use App\Core\Exceptions\Http\BadRequestHttpException;
use App\Core\Middleware;
use App\Core\Http\Request\Request;
use App\Core\Http\Response\Response;
use App\Common\Validation\Validator;
use App\Features\Items\Dtos\CreateItemDto;

class CreateItemValidationMiddleware extends Middleware
{
    const TIMING = self::RUN_BEFORE;

    const VALIDATION_SCHEMA = [
        'name' => [
            'required' => true,
            'is' => 'string',
            'minLength' => 3,
        ],
        'amount' => [
            'required' => true,
            'is' => ['integer', 'string'],
            'between' => [1, 100],
        ],
        'description' => [
            'required' => false,
            'is' => 'string',
            'minLength' => 3,
        ],
    ];

    public function process(Request $req, Response $res, ...$args): Response
    {
        $body = $req->getBody();
        $validator = new Validator($body, self::VALIDATION_SCHEMA);
        $listId = $req->getUriParameter('listid');

        if ($body === null || $listId === null || !$validator->validate()) {
            $message = 'Could not create a new item';
            $data = ['validation' => $validator->getErrors()];
            throw (new BadRequestHttpException($message))->setData($data);
        }

        $authData = $req->getAuthenticationData();

        $dto = new CreateItemDto();
        $dto->userId = $authData['user_id'];
        $dto->listID = $listId;
        $dto->name = $body['name'];
        $dto->amount = intval($body['amount']);
        $dto->description = $body['description'] ?? '';

        $req->setValidatedData(['dto' => $dto]);

        return $res;
    }
}
