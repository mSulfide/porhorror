<?php

class Gamer {
    public GameObject $object;
    public float $axisX, $axisY;
    public bool $isAction;

    function __construct($params, $objects) {
        foreach ($objects as $object) {
            if ($object->id === $params->objectId) {
                $this->object = $object;
                break;
            }
        }
        $this->axisX = $params->axisX;
        $this->axisY = $params->axisY;
        $this->isAction = $params->isAction;
    }

    public function update($deltaTime) {
        $this->object->velocity = new Point($this->axisX, $this->axisY);
    }
}
