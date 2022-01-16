<?php

namespace App\Core\Exceptions\Http;

use App\Core\Http\HttpStatusCode;

class ForbiddenHttpException extends HttpException
{
    public function __construct(string $message)
    {
        parent::__construct($message, HttpStatusCode::Forbidden);
    }
}