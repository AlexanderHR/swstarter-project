<?php

namespace App\DTOs\Swapi;

class FilmSearchDTO
{
    public function __construct(
        public array $results
    ) {}

    public static function fromApi(array $data): self
    {
        $results = array_map(
            fn($item) => FilmSummaryDTO::fromSearchItem($item),
            $data['result']
        );

        return new self(results: $results);
    }

    public function toArray(): array
    {
        return [
            'results' => array_map(fn($film) => $film->toArray(), $this->results),
        ];
    }
}
