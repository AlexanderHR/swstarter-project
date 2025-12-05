<?php

namespace App\Services\StarWars;

use App\DTOs\Swapi\PeopleListDTO;
use App\DTOs\Swapi\PersonDTO;

interface StarWarsServiceInterface
{
    public function getPeople(int $page = 1, int $limit = 10): PeopleListDTO;
    public function getPerson(string $id): PersonDTO;
}
