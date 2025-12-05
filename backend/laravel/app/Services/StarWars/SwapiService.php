<?php

namespace App\Services\StarWars;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\DTOs\Swapi\PeopleListDTO;
use App\DTOs\Swapi\PersonDTO;
use Exception;

class SwapiService implements StarWarsServiceInterface
{
    protected string $baseUrl = 'https://www.swapi.tech/api';

    public function getPeople(int $page = 1, int $limit = 10): PeopleListDTO
    {
        try {
            $response = Http::get("{$this->baseUrl}/people", [
                'page' => $page,
                'limit' => $limit,
            ]);

            if ($response->failed()) {
                Log::error('Failed to fetch people from Swapi', ['status' => $response->status(), 'body' => $response->body()]);
                throw new Exception('Failed to fetch people data.');
            }

            return PeopleListDTO::fromApi($response->json());
        } catch (Exception $e) {
            Log::error('Error in SwapiService::getPeople', ['message' => $e->getMessage()]);
            throw $e;
        }
    }

    public function getPerson(string $id): PersonDTO
    {
        try {
            $response = Http::get("{$this->baseUrl}/people/{$id}");

            if ($response->failed()) {
                Log::error("Failed to fetch person {$id} from Swapi", ['status' => $response->status(), 'body' => $response->body()]);
                throw new Exception("Failed to fetch person data for ID: {$id}");
            }

            return PersonDTO::fromApi($response->json());
        } catch (Exception $e) {
            Log::error('Error in SwapiService::getPerson', ['message' => $e->getMessage()]);
            throw $e;
        }
    }
}
