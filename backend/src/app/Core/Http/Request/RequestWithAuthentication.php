<?php

namespace App\Core\Http\Request;

trait RequestWithAuthentication
{
    /** @var array|null */
    protected $auth = null;

    public function addAuthenticationData(array $auth): self
    {
        if ($this->auth === null) {
            $this->auth = [];
        }

        $this->auth = array_merge($this->auth, $auth);

        return $this;
    }

    public function setAuthenticationData($auth): self
    {
        $this->auth = $auth;

        return $this;
    }

    /**
     * @param string|null $key
     */
    public function getAuthenticationData($key = null)
    {
        if ($key !== null) {
            return $this->auth[$key] ?? null;
        }

        return $this->auth;
    }

    public function clearAuthenticationData(): self
    {
        $this->auth = null;

        return $this;
    }
}
