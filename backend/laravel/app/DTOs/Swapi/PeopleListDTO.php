<?php

namespace App\DTOs\Swapi;

class PeopleListDTO
{
    public function __construct(
        public int $totalRecords,
        public int $totalPages,
        public ?string $previous,
        public ?string $next,
        public array $results
    ) {}

    public static function fromApi(array $data): self
    {
        return new self(
            totalRecords: $data['total_records'],
            totalPages: $data['total_pages'],
            previous: $data['previous'],
            next: $data['next'],
            results: $data['results']
        );
    }

    public function toArray(): array
    {
        return [
            'total_records' => $this->totalRecords,
            'total_pages' => $this->totalPages,
            'previous' => $this->previous,
            'next' => $this->next,
            'results' => $this->results,
        ];
    }
}
