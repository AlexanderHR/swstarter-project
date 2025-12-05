<?php

namespace App\DTOs\Swapi;

class PersonDTO
{
    public function __construct(
        public string $uid,
        public string $name,
        public string $height,
        public string $mass,
        public string $hairColor,
        public string $skinColor,
        public string $eyeColor,
        public string $birthYear,
        public string $gender,
        public string $homeworld,
        public string $url
    ) {}

    public static function fromApi(array $data): self
    {
        $properties = $data['result']['properties'];
        return new self(
            uid: $data['result']['uid'],
            name: $properties['name'],
            height: $properties['height'],
            mass: $properties['mass'],
            hairColor: $properties['hair_color'],
            skinColor: $properties['skin_color'],
            eyeColor: $properties['eye_color'],
            birthYear: $properties['birth_year'],
            gender: $properties['gender'],
            homeworld: $properties['homeworld'],
            url: $properties['url']
        );
    }

    public function toArray(): array
    {
        return [
            'uid' => $this->uid,
            'name' => $this->name,
            'height' => $this->height,
            'mass' => $this->mass,
            'hair_color' => $this->hairColor,
            'skin_color' => $this->skinColor,
            'eye_color' => $this->eyeColor,
            'birth_year' => $this->birthYear,
            'gender' => $this->gender,
            'homeworld' => $this->homeworld,
            'url' => $this->url,
        ];
    }
}
