<?php

namespace App\DTOs\Swapi;

class FilmSummaryDTO
{
    public function __construct(
        public string $uid,
        public string $description
    ) {}

    public static function fromSearchItem(array $item): self
    {
        return new self(
            uid: $item['uid'],
            description: $item['properties']['title']
        );
    }

    public function toArray(): array
    {
        return [
            'uid' => $this->uid,
            'description' => $this->description,
        ];
    }
}
