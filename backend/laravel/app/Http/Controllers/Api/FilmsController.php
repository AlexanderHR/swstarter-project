<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StarWars\StarWarsServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class FilmsController extends Controller
{
    protected StarWarsServiceInterface $starWarsService;

    public function __construct(StarWarsServiceInterface $starWarsService)
    {
        $this->starWarsService = $starWarsService;
    }

    public function index(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        try {
            $title = $request->query('title');
            $films = $this->starWarsService->searchFilms($title);
            
            return response()->json($films->toArray());
        } catch (Exception $e) {
            $request->attributes->set('error_message', $e->getMessage());
            $request->attributes->set('exception_type', get_class($e));

            return response()->json(['error' => 'Unable to fetch films list.'], 500);
        }
    }

    public function show(string $id): JsonResponse
    {
        try {
            $film = $this->starWarsService->getFilm($id);
            return response()->json($film->toArray());
        } catch (Exception $e) {
            return response()->json(['error' => 'Unable to fetch film details.'], 500);
        }
    }
}
