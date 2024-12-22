<?php

class Gamer {
    public $objectId; 
    public $axis_x;
    public $axis_y;

    function __construct($params) {
        $this->objectId = $params->objectId;
        $this->axis_x = $params->axis_x;
        $this->axis_y = $params->axis_y;
    }

    public function update($deltaTime, $objects) {
        foreach ($objects as $object) {
            if ($object->id === $this->objectId) {
                $axisX = $this->axis_x * $deltaTime; 
                $axisY = $this->axis_y * $deltaTime; 

                $object->move(new Point($axisX, $axisY));
                break;
            }
        }
    }
}
