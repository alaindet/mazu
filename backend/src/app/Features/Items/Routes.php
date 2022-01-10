<?php

namespace App\Features\Items;

use App\Core\Routing\Route\Route;
use App\Core\Routing\RouteGroup;
use App\Features\Authentication\Middleware\AuthenticationMiddleware;
use App\Features\Authentication\Middleware\RoleAuthorizationMiddleware;
use App\Features\Items\Controllers\ItemsController;
use App\Features\Items\Middleware\CreateItemValidationMiddleware;
use App\Features\Items\Middleware\UpdateItemValidationMiddleware;
use App\Features\Users\Enums\UserRole;

class Routes
{
    public static function register(): array
    {
        return (new RouteGroup)
            ->path('/lists/{listid}/items')
            ->pathConstraints([
                'listid' => '\d+',
                'itemid' => '\d+',
            ])
            ->middleware(AuthenticationMiddleware::class)
            ->handler(ItemsController::class)
            ->routes([

                Route::post('/', '@create')
                    ->middleware(CreateItemValidationMiddleware::class),

                Route::get('/', '@getAll'),

                // Bulk operations
                Route::patch('/all/mark', '@markAllAsDone'),
                Route::patch('/all/unmark', '@unmarkAllAsDone'),
                Route::delete('/all', '@deleteAll'),
                Route::delete('/all/done', '@deleteAllDone'),
                Route::patch('/many/mark')

                Route::patch('/{itemid}/mark', '@markAsDone'),
                Route::patch('/{itemid}/unmark', '@unmarkAsDone'),

                Route::patch('/{itemid}', '@update')
                    ->middleware(UpdateItemValidationMiddleware::class),

                Route::delete('/{itemid}', '@delete'),

            ])
            ->collect();
    }
}
