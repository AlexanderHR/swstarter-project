<?php

namespace App\DTOs\Swapi;

class PeopleSearchDTO
{
    public function __construct(
        public array $results
    ) {}

    public static function fromApi(array $data): self
    {
        $results = array_map(
            fn($item) => PersonSummaryDTO::fromSearchItem($item),
            $data['result']
        );

        return new self(results: $results);
    }

    public function toArray(): array
    {
        return [
            'results' => array_map(fn($person) => $person->toArray(), $this->results),
        ];
    }
}
