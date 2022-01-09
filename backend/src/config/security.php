<?php

return [

    'cors.origin' => $_ENV['MAZU_SECURITY_CORS_ORIGIN'],
    'cors.methods' => $_ENV['MAZU_SECURITY_CORS_METHODS'],
    'cors.maxage' => $_ENV['MAZU_SECURITY_CORS_MAX_AGE'],
    'cors.headers' => $_ENV['MAZU_SECURITY_CORS_HEADERS'],

    'jwt.secret' => $_ENV['MAZU_SECURITY_JWT_SECRET'],
    'jwt.issuer' => $_ENV['MAZU_SECURITY_JWT_ISSUER'],
    'jwt.expires' => $_ENV['MAZU_SECURITY_JWT_EXPIRES_IN'],

];
