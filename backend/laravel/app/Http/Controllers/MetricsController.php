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
                'data' => [
                    'average_response_time_ms' => 0,
                    'response_time_percentiles' => [],
                    'most_popular_hour' => null,
                    'most_popular_hour_count' => 0,
                    'status_codes_by_path' => [],
                    'last_updated' => now()->toIso8601String(),
                ]
            ]);
        }

        return response()->json([
            'data' => json_decode($metrics, true)
        ]);
    }
}
