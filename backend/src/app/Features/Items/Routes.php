<?php

namespace App\Features\Items;

use App\Core\Routing\Route\Route;
use App\Core\Routing\RouteGroup;
use App\Features\Authentication\Middleware\AuthenticationMiddleware;
use App\Features\Items\Controllers\ItemsController;
use App\Features\Items\Middleware\CreateItemValidationMiddleware as CreateItem;
use App\Features\Items\Middleware\UpdateItemValidationMiddleware as UpdateItem;

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

                Route::post('/', '@create')->middleware(CreateItem::class),
                Route::get('/', '@getAll'),

                // Bulk operations: all
                Route::patch('/all/mark', '@markAllAsDone'),
                Route::patch('/all/unmark', '@unmarkAllAsDone'),
                Route::delete('/all', '@deleteAll'),
                Route::delete('/all/marked', '@deleteAllMarkedAsDone'),

                // Single operations
                Route::patch('/{itemid}/mark', '@markAsDone'),
                Route::patch('/{itemid}/unmark', '@unmarkAsDone'),
                Route::patch('/{itemid}', '@update')->middleware(UpdateItem::class),
                Route::delete('/{itemid}', '@delete'),

            ])
            ->collect();
    }
}
