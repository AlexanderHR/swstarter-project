<?php

namespace App\DTOs\Swapi;

class FilmDTO
{
    public function __construct(
        public string $id,
        public string $title,
        public string $openingCrawl,
        public array $characterIds = [],
        public array $characters = []
    ) {}

    public static function fromApi(array $data): self
    {
        $result = $data['result'];
        $properties = $result['properties'];

        $characterIds = array_map(function ($url) {
            return basename(rtrim($url, '/'));
        }, $properties['characters'] ?? []);

        return new self(
            id: $result['uid'],
            title: $properties['title'],
            openingCrawl: $properties['opening_crawl'],
            characterIds: $characterIds
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'opening_crawl' => $this->openingCrawl,
            'characters_id' => $this->characterIds,
            'characters' => $this->characters,
        ];
    }
}
