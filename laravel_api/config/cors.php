<?php

return [
    'paths' => ['api/*', 'login', 'logout'], // The paths to allow cross-origin requests (typically API routes).
    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.).
    'allowed_origins' => ['http://localhost:3000'], // Add the URL of your React app (React's default port is 3000).
    'allowed_origins_patterns' => [], // You can define regex patterns here if needed.
    'allowed_headers' => ['*'], // Allow all headers.
    'exposed_headers' => [], // If there are any specific headers you want to expose, you can add them here.
    'max_age' => 0, // The amount of time the preflight request can be cached. Set to 0 if no caching is desired.
    'supports_credentials' => false, // Set to true if your React app needs to send cookies or credentials (authentication).
];
