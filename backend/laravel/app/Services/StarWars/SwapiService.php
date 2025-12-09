<?php

namespace App\Services\StarWars;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Client\Pool;
use App\DTOs\Swapi\PeopleSearchDTO;
use App\DTOs\Swapi\PersonDTO;
use App\DTOs\Swapi\FilmDTO;
use App\DTOs\Swapi\FilmSearchDTO;
use Exception;

class SwapiService implements StarWarsServiceInterface
{
    protected string $baseUrl = 'https://www.swapi.tech/api';

    public function searchPeople(string $name): PeopleSearchDTO
    {
        try {
            $response = Http::get("{$this->baseUrl}/people", [
                'name' => $name,
            ]);

            if ($response->failed()) {
                Log::error('Failed to search people from Swapi', ['status' => $response->status(), 'body' => $response->body()]);
                throw new Exception('Failed to search people data.');
            }

            return PeopleSearchDTO::fromApi($response->json());
        } catch (Exception $e) {
            Log::error('Error in SwapiService::searchPeople', ['message' => $e->getMessage()]);
            throw $e;
        }
    }

    public function searchFilms(string $title): FilmSearchDTO
    {
        try {
            $response = Http::get("{$this->baseUrl}/films", [
                'title' => $title,
            ]);

            if ($response->failed()) {
                Log::error('Failed to search films from Swapi', ['status' => $response->status(), 'body' => $response->body()]);
                throw new Exception('Failed to search films data.');
            }

            return FilmSearchDTO::fromApi($response->json());
        } catch (Exception $e) {
            Log::error('Error in SwapiService::searchFilms', ['message' => $e->getMessage()]);
            throw $e;
        }
    }

    public function getPerson(string $id): PersonDTO
    {
        // Cache for 15 minutes
        return Cache::store('redis')->remember("person_{$id}", 60 * 15, function () use ($id) {
            try {
                $response = Http::get("{$this->baseUrl}/people/{$id}");

                if ($response->failed()) {
                    Log::error("Failed to fetch person {$id} from Swapi", ['status' => $response->status(), 'body' => $response->body()]);
                    throw new Exception("Failed to fetch person data for ID: {$id}");
                }

                $personDTO = PersonDTO::fromApi($response->json());

                if (!empty($personDTO->filmsIds)) {
                    $responses = Http::pool(function (Pool $pool) use ($personDTO) {
                        $requests = [];
                        foreach ($personDTO->filmsIds as $filmId) {
                            $requests[] = $pool->get("{$this->baseUrl}/films/{$filmId}");
                        }
                        return $requests;
                    });

                    foreach ($responses as $response) {
                        if ($response->successful()) {
                            $filmDto = FilmDTO::fromApi($response->json());
                            $personDTO->films[] = [
                                'id' => $filmDto->id,
                                'title' => $filmDto->title,
                            ];
                        } else {
                            Log::warning("Failed to fetch film details", ['status' => $response->status()]);
                        }
                    }
                }

                return $personDTO;
            } catch (Exception $e) {
                Log::error('Error in SwapiService::getPerson', ['message' => $e->getMessage()]);
                throw $e;
            }
        });
    }

    public function getFilm(string $id): FilmDTO
    {
        // Cache for 15 minutes
        return Cache::store('redis')->remember("film_v2_{$id}", 60 * 15, function () use ($id) {
            try {
                $response = Http::get("{$this->baseUrl}/films/{$id}");

                if ($response->failed()) {
                    Log::error("Failed to fetch film {$id} from Swapi", ['status' => $response->status(), 'body' => $response->body()]);
                    throw new Exception("Failed to fetch film data for ID: {$id}");
                }

                $filmDTO = FilmDTO::fromApi($response->json());

                if (!empty($filmDTO->characterIds)) {
                    $responses = Http::pool(function (Pool $pool) use ($filmDTO) {
                        $requests = [];
                        foreach ($filmDTO->characterIds as $characterId) {
                            $requests[] = $pool->get("{$this->baseUrl}/people/{$characterId}");
                        }
                        return $requests;
                    });

                    foreach ($responses as $response) {
                        if ($response->successful()) {
                            $personDto = PersonDTO::fromApi($response->json());
                            $filmDTO->characters[] = [
                                'id' => $personDto->uid,
                                'name' => $personDto->name,
                            ];
                        } else {
                            Log::warning("Failed to fetch person details", ['status' => $response->status()]);
                        }
                    }
                }

                return $filmDTO;
            } catch (Exception $e) {
                Log::error('Error in SwapiService::getFilm', ['message' => $e->getMessage()]);
                throw $e;
            }
        });
    }

    public function getRelatedEntities(string $type, string $id, string $relatedIds): array
    {
        // Cache key: type-id. e.g. 'related-people-1' (people related to film 1) or 'related-films-1' (films related to person 1)
        return Cache::store('redis')->remember("related-{$type}-{$id}", 60 * 15, function () use ($type, $relatedIds) {
             $ids = explode(',', $relatedIds);
             $responses = Http::pool(function (Pool $pool) use ($type, $ids) {
                $requests = [];
                $endpoint = ($type === 'people') ? 'people' : 'films';
                
                foreach ($ids as $entityId) {
                    $requests[] = $pool->get("{$this->baseUrl}/{$endpoint}/{$entityId}");
                }
                return $requests;
            });

            $results = [];
            foreach ($responses as $response) {
                if ($response->successful()) {
                    $data = $response->json();
                    $item = $data['result'] ?? null;
                    
                    if ($item) {
                        $properties = $item['properties'] ?? [];
                        $uid = $item['uid'] ?? $item['_id'] ?? null;
                        
                        $description = '';
                        if ($type === 'people') {
                            $description = $properties['name'] ?? '';
                        } else {
                            $description = $properties['title'] ?? '';
                        }
                        
                        if ($uid && $description) {
                            $results[] = [
                                'id' => $uid,
                                'description' => $description,
                            ];
                        }
                    }
                } else {
                     Log::warning("Failed to fetch related entity details", ['type' => $type, 'status' => $response->status()]);
                }
            }
            return $results;
        });
    }
}