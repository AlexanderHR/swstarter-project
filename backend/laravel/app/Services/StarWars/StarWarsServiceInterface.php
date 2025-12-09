<?php

namespace App\Services\StarWars;

use App\DTOs\Swapi\PeopleSearchDTO;
use App\DTOs\Swapi\PersonDTO;
use App\DTOs\Swapi\FilmDTO;
use App\DTOs\Swapi\FilmSearchDTO;

interface StarWarsServiceInterface
{
    public function searchPeople(string $name): PeopleSearchDTO;
    public function searchFilms(string $title): FilmSearchDTO;
    public function getPerson(string $id): PersonDTO;
    public function getFilm(string $id): FilmDTO;
    public function getRelatedEntities(string $type, string $id, string $relatedIds): array;
}
