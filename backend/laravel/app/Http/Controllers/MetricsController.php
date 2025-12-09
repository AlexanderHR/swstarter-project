<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Redis;

class MetricsController extends Controller
{
    public function index(): JsonResponse
    {
        $metrics = Redis::get('api_metrics');

        if (!$metrics) {
            return response()->json([
                'message' => 'Metrics not yet calculated',
                'data' => null
            ]);
        }

        return response()->json([
            'data' => json_decode($metrics, true)
        ]);
    }
}
