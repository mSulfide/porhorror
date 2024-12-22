<?php

class GameObject {
    private $db;
    public int $id;

    public Point $position, $velocity;
    public int $gameId;
    public float $radius, $angle;

    function __construct($params) {
        $this->id = $params->id;
        $this->position = new Point($params->x, $params->y);
        $this->velocity = new Point($params->velocity_x, $params->velocity_y);
        $this->gameId = $params->game_id;
        $this->radius = $params->radius;
        $this->angle = $params->angle;
    }

    function __destruct() {
        $this->updateDB();
    }

    public function update() {}

    public function move($offset) {
        $math = new GMath()
        $this->position = $math->add($this->position, $offset);
    }
}