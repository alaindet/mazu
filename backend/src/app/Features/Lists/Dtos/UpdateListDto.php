<?php

namespace App\Features\Lists\Dtos;

class UpdateListDto
{
    /** @var string|int */
    public $listId;
    public ?bool $isFavorite;
    public ?string $name;
    public ?string $description;
}
