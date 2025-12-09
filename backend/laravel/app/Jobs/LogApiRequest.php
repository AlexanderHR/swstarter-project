<?php

namespace App\Jobs;

use App\Models\ApiRequestLog;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class LogApiRequest implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public string $path,
        public ?string $searchTerm,
        public int $responseTimeMs,
        public ?array $queryParams,
        public ?string $ipAddress,
        public ?string $userAgent,
        public int $statusCode,
        public string $requestMethod,
        public ?int $responseSizeBytes = null,
        public ?string $errorMessage = null,
        public ?string $exceptionType = null
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        ApiRequestLog::create([
            'path' => $this->path,
            'search_term' => $this->searchTerm,
            'response_time_ms' => $this->responseTimeMs,
            'query_params' => json_encode($this->queryParams),
            'ip_address' => $this->ipAddress,
            'user_agent' => $this->userAgent,
            'status_code' => $this->statusCode,
            'request_method' => $this->requestMethod,
            'response_size_bytes' => $this->responseSizeBytes,
            'error_message' => $this->errorMessage,
            'exception_type' => $this->exceptionType,
        ]);
    }
}
