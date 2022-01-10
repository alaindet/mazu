<?php

namespace App\Features\Lists\Dtos;

class GetListDto
{
    /** @var string|int */
    public $listId;
    /** @var string|int */
    public $userId;
    public bool $isFavorite;
    public string $name;
    /** @var string|null */
    public $description;
}
