<?php

return [
    'host' => $_ENV['MAZU_DB_HOST'],
    'database' => $_ENV['MAZU_DB_NAME'],
    'user' => $_ENV['MAZU_DB_USER'],
    'password' => $_ENV['MAZU_DB_PASSWORD'],
    'port' => $_ENV['MAZU_DB_PORT'],
    'charset' => 'utf8',
    'options' => [
        \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
        // \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_CLASS,
        \PDO::ATTR_EMULATE_PREPARES => false,
    ],
];
