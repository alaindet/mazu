<?php

namespace App\Features\Items\Dtos;

class CreateItemDto
{
    /** @var string|int */
    public $userId;
    /** @var string|int */
    public $listId;
    public string $name;
    public int $amount;
    public ?string $description;
}
