<?php

namespace App\Features\Items\Dtos;

class GetItemDto
{
    /** @var string|int */
    public $itemId;
    /** @var string|int */
    public $userId;
    /** @var string|int */
    public $listId;
    public string $name;
    public int $amount;
    public string $description;
    public bool $isDone;
}
