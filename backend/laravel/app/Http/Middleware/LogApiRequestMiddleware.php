<?php

namespace App\Http\Middleware;

use App\Jobs\LogApiRequest;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class LogApiRequestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $startTime = microtime(true);

        $response = $next($request);

        $durationMs = (int) ((microtime(true) - $startTime) * 1000);

        // Extract information
        $path = $request->path();
        $searchTerm = $request->query('name') ?? null;
        $queryParams = $request->query();

        $ipAddress = $request->ip();
        $userAgent = $request->userAgent();
        $statusCode = $response->getStatusCode();
        $requestMethod = $request->method();
        
        // Calculate response size
        $content = $response->getContent();
        $responseSizeBytes = $content ? strlen($content) : 0;

        // Error handling
        $errorMessage = $request->attributes->get('error_message');
        $exceptionType = $request->attributes->get('exception_type');

        if (!$errorMessage && $response->exception) {
            $errorMessage = $response->exception->getMessage();
            $exceptionType = get_class($response->exception);
        }

        // Dispatch the job
        LogApiRequest::dispatch(
            $path,
            $searchTerm,
            $durationMs,
            $queryParams,
            $ipAddress,
            $userAgent,
            $statusCode,
            $requestMethod,
            $responseSizeBytes,
            $errorMessage,
            $exceptionType
        );

        return $response;
    }
}
