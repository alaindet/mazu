<?php

namespace App\Core\Http\Request;

trait RequestWithValidatedData
{
    /** @var array|null */
    protected $data = null;

    public function addValidatedData(array $data): self
    {
        if ($this->data === null) {
            $this->data = [];
        }

        $this->data = array_merge($this->data, $data);

        return $this;
    }

    public function setValidatedData(array $data): self
    {
        $this->data = $data;

        return $this;
    }

    /**
     * @param string|null $key
     */
    public function getValidatedData($key = null)
    {
        if ($key !== null) {
            return $this->data[$key] ?? null;
        }

        return $this->data;
    }

    public function clearValidatedData(): self
    {
        $this->data = null;

        return $this;
    }
}
