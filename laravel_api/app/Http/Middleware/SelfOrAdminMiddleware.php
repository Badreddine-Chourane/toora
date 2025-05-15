<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SelfOrAdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = auth()->user();
        $requestedId = $request->route('id');

        if (!$user || ($user->id != $requestedId && $user->role !== 'admin')) {
            return response()->json(['message' => 'You can only access your own profile unless you are an admin.'], 403);
        }

        return $next($request);
    }
}
