<?php

namespace App\DTOs\Swapi;

class PersonSummaryDTO
{
    public function __construct(
        public string $uid,
        public string $name
    ) {}

    public static function fromSearchItem(array $item): self
    {
        return new self(
            uid: $item['uid'],
            name: $item['properties']['name']
        );
    }

    public function toArray(): array
    {
        return [
            'uid' => $this->uid,
            'name' => $this->name,
        ];
    }
}
