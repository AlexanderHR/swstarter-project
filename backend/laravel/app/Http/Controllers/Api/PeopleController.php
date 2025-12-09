<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StarWars\StarWarsServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        try {
            $name = $request->query('name');
            $people = $this->starWarsService->searchPeople($name);
            
            return response()->json($people->toArray());
        } catch (Exception $e) {
            // Pass error info to middleware
            $request->attributes->set('error_message', $e->getMessage());
            $request->attributes->set('exception_type', get_class($e));

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
