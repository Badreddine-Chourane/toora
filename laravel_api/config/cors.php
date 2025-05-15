<?php

return [
    'paths' => ['api/*', 'login', 'logout'], // The paths to allow cross-origin requests (typically API routes).
    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.).
    'allowed_origins' => ['http://localhost:3000'], // Add the URL of your React app (React's default port is 3000).
    'allowed_origins_patterns' => [], // You can define regex patterns here if needed.
    'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
