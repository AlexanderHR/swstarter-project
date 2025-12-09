<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiRequestLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'search_term',
        'response_time_ms',
        'query_params',
        'ip_address',
        'user_agent',
        'status_code',
        'request_method',
        'response_size_bytes',
        'error_message',
        'exception_type',
    ];
}
