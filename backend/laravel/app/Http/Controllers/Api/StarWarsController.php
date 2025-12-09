<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\StarWars\StarWarsServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;

class StarWarsController extends Controller
{
    protected StarWarsServiceInterface $starWarsService;

    public function __construct(StarWarsServiceInterface $starWarsService)
    {
        $this->starWarsService = $starWarsService;
    }
    // alternative proposal for related entities endpoint
    public function relatedEntities(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|in:people,films',
            'id' => 'required|string',
            'relatedIds' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first()
            ], 422);
        }

        try {
            $type = $request->input('type');
            $id = $request->input('id');
            $relatedIds = $request->input('relatedIds');

            $entities = $this->starWarsService->getRelatedEntities($type, $id, $relatedIds);
            
            return response()->json($entities);
        } catch (Exception $e) {
            // Pass error info to middleware
            $request->attributes->set('error_message', $e->getMessage());
            $request->attributes->set('exception_type', get_class($e));

            return response()->json(['error' => 'Unable to fetch related entities.'], 500);
        }
    }
}
