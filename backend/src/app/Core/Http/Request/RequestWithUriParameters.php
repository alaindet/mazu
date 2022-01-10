<?php

namespace App\Core\Http\Request;

trait RequestWithUriParameters
{
    protected array $uriParameters = [];

    /**
     * @param array|null $keys
     */
    public function getUriParameters($keys = null): array
    {
        if (!isset($keys)) {
            return $this->uriParameters;
        }

        $data = [];

        foreach ($keys as $key) {
            $data[] = $this->uriParameters[$key];
        }

        return $data;
    }

    public function getUriParameter(string $name)
    {
        return $this->uriParameters[$name] ?? null;
    }

    public function setUriParameters(array $uriParameters): self
    {
        $this->uriParameters = $uriParameters;

        return $this;
    }
}
