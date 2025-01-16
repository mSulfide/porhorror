<?php

class Physic {
    private $math;

    function __construct() {
        $this->math = new Math();
    }

    public function findCollisions($gamers) {
        $collisions = [];
        foreach ($gamers as $gamerA) {
            foreach ($gamers as $gamerB) {
                if ($gamerA !== $gamerB) {
                    $a = new Circle($gamerA->getPosition(), $gamerA->getRadius());
                    $b = new Circle($gamerB->getPosition(), $gamerB->getRadius());
                    $point = $this->math->getIntersectionPoint($a, $b);
                    if ($point) {
                        $collision = new stdClass();
                        $collision->norm = $this->math->norm($this->math->sub($a->position, $b->position));
                        $collision->gamer = $gamerA;
                        $collisions[] = $collision;
                    }
                }
            }
        }
        return $collisions;
    }
}