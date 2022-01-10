<?php

namespace App\Features\Lists;

use App\Core\Routing\Route\Route;
use App\Core\Routing\RouteGroup;
use App\Features\Authentication\Middleware\AuthenticationMiddleware;
use App\Features\Authentication\Middleware\RoleAuthorizationMiddleware;
use App\Features\Lists\Controllers\ListsController;
use App\Features\Lists\Middleware\CreateListValidationMiddleware;
use App\Features\Lists\Middleware\UpdateListValidationMiddleware;
use App\Features\Users\Enums\UserRole;

class Routes
{
    public static function register(): array
    {
        return (new RouteGroup)
            ->path('/lists')
            ->pathConstraints(['listid' => '\d+'])
            ->middleware(AuthenticationMiddleware::class)
            ->handler(ListsController::class)
            ->routes([

                Route::post('/', '@create')
                    ->middleware(CreateListValidationMiddleware::class),

                Route::get('/', '@getAll'),

                Route::get('/{listid}', '@getById'),

                Route::patch('/{listid}/mark', '@markAsFavorite'),

                Route::patch('/{listid}/unmark', '@unmarkAsFavorite'),

                Route::patch('/{listid}', '@update')
                    ->middleware(UpdateListValidationMiddleware::class),

                Route::delete('/{listid}', '@delete'),

            ])
            ->collect();
    }
}
