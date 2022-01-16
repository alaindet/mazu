<?php

namespace App\Features\Items\Dtos;

class UpdateItemDto
{
    /** @var string|int */
    public $itemId;
    /** @var string|int */
    public $listId;
    public ?string $name;
    public ?int $amount;
    public ?string $description;
    public ?bool $isDone;
}
