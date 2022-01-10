<?php

namespace App\Features\Lists\Dtos;

class CreateListDto
{
    /** @var string|int */
    public $userId;
    public string $name;
    public ?string $description;
}
