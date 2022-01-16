<?php

return [
    'development' => (
        isset($_ENV['MAZU_APP_ENV']) &&
        $_ENV['MAZU_APP_ENV'] === 'development'
    ),
    'production' => (
        isset($_ENV['MAZU_APP_ENV']) &&
        $_ENV['MAZU_APP_ENV'] === 'production'
    ),
    'debug' => (
        isset($_ENV['MAZU_APP_DEBUG']) &&
        $_ENV['MAZU_APP_DEBUG'] === 'true'
    )
];
