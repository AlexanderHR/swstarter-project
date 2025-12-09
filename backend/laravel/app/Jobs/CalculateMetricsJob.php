<?php

namespace App\Jobs;

use App\Models\ApiRequestLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\DB;

class CalculateMetricsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // 1. Average length of request timing
        $avgResponseTime = ApiRequestLog::where('path', '!=', 'api/metrics')
            ->avg('response_time_ms');

        // 2. Response time percentiles by path
        $percentilesByPath = ApiRequestLog::where('path', '!=', 'api/metrics')
            ->select(
                DB::raw("REGEXP_REPLACE(path, '/[0-9]+$', '/{id}') as normalized_path"),
                DB::raw('percentile_cont(0.5) WITHIN GROUP (ORDER BY response_time_ms) as p50'),
                DB::raw('percentile_cont(0.9) WITHIN GROUP (ORDER BY response_time_ms) as p90'),
                DB::raw('percentile_cont(0.95) WITHIN GROUP (ORDER BY response_time_ms) as p95'),
                DB::raw('percentile_cont(0.99) WITHIN GROUP (ORDER BY response_time_ms) as p99')
            )
            ->groupBy('normalized_path')
            ->get();

        $formattedPercentiles = [];
        foreach ($percentilesByPath as $row) {
            $formattedPercentiles[$row->normalized_path] = [
                'p50' => $row->p50 ? round($row->p50, 2) : 0,
                'p90' => $row->p90 ? round($row->p90, 2) : 0,
                'p95' => $row->p95 ? round($row->p95, 2) : 0,
                'p99' => $row->p99 ? round($row->p99, 2) : 0,
            ];
        }

        // 3. Most popular hour of day for overall search volume
        // We look for logs that have a search_term
        $popularHour = ApiRequestLog::whereNotNull('search_term')
            ->where('path', '!=', 'api/metrics')
            ->select(DB::raw('EXTRACT(HOUR FROM created_at) as hour'), DB::raw('count(*) as count'))
            ->groupBy('hour')
            ->orderByDesc('count')
            ->first();

        // 4. Status codes by path
        $statusCodesByPath = ApiRequestLog::where('path', '!=', 'api/metrics')
            ->select(
                DB::raw("REGEXP_REPLACE(path, '/[0-9]+$', '/{id}') as normalized_path"),
                'status_code',
                DB::raw('count(*) as count')
            )
            ->groupBy('normalized_path', 'status_code')
            ->orderBy('normalized_path')
            ->orderBy('status_code')
            ->get();

        $formattedStatusCodes = [];
        foreach ($statusCodesByPath as $row) {
            $path = $row->normalized_path;
            $code = $row->status_code;
            $count = $row->count;

            if (!isset($formattedStatusCodes[$path])) {
                $formattedStatusCodes[$path] = [];
            }
            $formattedStatusCodes[$path][$code] = $count;
        }

        $metrics = [
            'average_response_time_ms' => $avgResponseTime ? round($avgResponseTime, 2) : 0,
            'response_time_percentiles' => $formattedPercentiles,
            'most_popular_hour' => $popularHour ? $popularHour->hour : null,
            'most_popular_hour_count' => $popularHour ? $popularHour->count : 0,
            'status_codes_by_path' => $formattedStatusCodes,
            'last_updated' => now()->toIso8601String(),
        ];

        // Store in Redis
        Redis::set('api_metrics', json_encode($metrics));
    }
}
