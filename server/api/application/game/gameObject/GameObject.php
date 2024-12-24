<?php

class GameObject {
    private $db, $math;
    public int $id;

    public Point $position, $velocity;
    public int $gameId;
    public float $radius, $angle;
    public string $image;

    function __construct($db, $params) {
        $this->db = $db;
        $this->id = $params->id;
        $this->image = $params->image;
        $this->position = new Point($params->x, $params->y);
        $this->velocity = new Point($params->velocity_x, $params->velocity_y);
        $this->gameId = $params->game_id;
        $this->radius = $params->radius;
        $this->angle = $params->angle;

        $this->math = new Math();
    }

    function __destruct() {
        $this->db->saveVelocity($this->id, $this->velocity);
        $this->db->setPosition($this->id, $this->position);
    }
    
    public function update($deltaTime) {
        $this->move($this->math->mlt($this->velocity, $deltaTime));
    }

    public function move($offset) {
        $this->position = $this->math->add($this->position, $offset);
    }
}