<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StarWars\StarWarsServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class PeopleController extends Controller
{
    protected StarWarsServiceInterface $starWarsService;

    public function __construct(StarWarsServiceInterface $starWarsService)
    {
        $this->starWarsService = $starWarsService;
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $page = $request->query('page', 1);
            $limit = $request->query('limit', 10);

            $people = $this->starWarsService->getPeople((int)$page, (int)$limit);

            return response()->json($people->toArray());
        } catch (Exception $e) {
            return response()->json(['error' => 'Unable to fetch people list.'], 500);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $person = $this->starWarsService->getPerson($id);

            return response()->json($person->toArray());
        } catch (Exception $e) {
            return response()->json(['error' => 'Unable to fetch person details.'], 500);
        }
    }
}
