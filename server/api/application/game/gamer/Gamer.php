<?php

class Gamer {
    public GameObject $object;
    public float $axisX, $axisY;
    public bool $isAction;

    function __construct($params, $object) {
        $this->object = $object;
        $this->axisX = $params->axisX;
        $this->axisY = $params->axisY;
        $this->isAction = $params->isAction;
    }

    public function update($deltaTime) {
        $this->object->velocity = new Point($this->axisX, $this->axisY);
    }
}
