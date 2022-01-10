<?php

namespace App\Features\Lists\Middleware;

use App\Core\Exceptions\Http\BadRequestHttpException;
use App\Core\Middleware;
use App\Core\Http\Request\Request;
use App\Core\Http\Response\Response;
use App\Common\Validation\Validator;
use App\Features\Lists\Dtos\CreateListDto;

class CreateListValidationMiddleware extends Middleware
{
    const TIMING = self::RUN_BEFORE;

    const VALIDATION_SCHEMA = [
        'name' => [
            'required' => true,
            'is' => 'string',
            'minLength' => 3,
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

        if ($body === null || !$validator->validate()) {
            $message = 'Could not create a new list';
            $data = ['validation' => $validator->getErrors()];
            throw (new BadRequestHttpException($message))->setData($data);
        }

        $authData = $req->getAuthenticationData();

        $dto = new CreateListDto();
        $dto->userId = $authData['user_id'];
        $dto->name = $body['name'];
        $dto->description = $body['description'] ?? null;

        $req->setValidatedData(['dto' => $dto]);

        return $res;
    }
}
