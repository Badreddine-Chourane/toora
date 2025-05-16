<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomCorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        // Allow specific origins
        $response->headers->set('Access-Control-Allow-Origin', env('CORS_ALLOWED_ORIGINS', '*'));
        // Allow specific methods
        $response->headers->set('Access-Control-Allow-Methods', env('CORS_ALLOWED_METHODS', 'GET, POST, PUT, DELETE'));
        // Allow specific headers
        $response->headers->set('Access-Control-Allow-Headers', env('CORS_ALLOWED_HEADERS', 'Content-Type, X-Requested-With, Authorization, Accept'));
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        // Handle preflight OPTIONS request
        if ($request->getMethod() == "OPTIONS") {
            $response->setStatusCode(200);
            $response->headers->set('Access-Control-Max-Age', 3600);
        }

        return $response;
    }
}

