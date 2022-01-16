<?php

namespace App\Common\Utils;

/**
 * Implementation of the singleton pattern
 */
trait Singleton
{
    /**
     * Single instance of this class
     *
     * @var array
     */
    private static $instance = null;

    /**
     * Returns always the same instance (builds it if none yet)
     *
     * @param array Variadic array, will be unpacked for __construct()
     * @return object Class instance
     */
    public static function getInstance(...$args)
    {
        if (self::$instance === null) {
            $className = get_called_class();
            $arguments = $args ?? [];
            self::$instance = new $className(...$arguments);
        }

        return self::$instance;
    }

    /**
     * Prevents cloning (copying) the instance
     *
     * @return void
     */
    private function __clone()
    {
        // None
    }

    /**
     * Prevent unserialization of this instance
     */
    public function __wakeup()
    {
        // None
    }
}
