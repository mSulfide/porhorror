<?php

require_once 'Point.php';

class Circle {
    public $position;
    public $radius;

    public function __construct(Point $position, $radius) {
        $this->position = $position;
        $this->radius = $radius;
    }
}