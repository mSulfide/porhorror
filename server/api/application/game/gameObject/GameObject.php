<?php

class GameObject {
    private $db, $math;
    private int $id;
    private Point $position, $velocity;
    private float $radius, $angle;

    function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;

        $params = $this->db->getGameObject($this->id);
        $this->position = new Point($params->x, $params->y);
        $this->velocity = new Point($params->velocity_x, $params->velocity_y);
        $this->angle = $params->angle;
        $this->radius = $params->radius;

        $this->math = new Math();
    }

    // сеттеры
    public function setPosition($position) {
        $this->db->setPosition($this->id, $position);
    }

    public function setVelocity($velocity) {
        $this->db->setVelocity($this->id, $velocity);
    }

    public function setAngle($angle) {
        $this->db->setVelocity($this->id, $angle);
    }

    public function setRadius($radius) {
        $this->db->setVelocity($this->id, $radius);
    }

    // геттеры
    public function getPosition() {
        return $this->position;
    }

    public function getVelocity() {
        return $this->velocity;
    }

    public function getAngle() {
        return $this->angle;
    }

    public function getRadius() {
        return $this->radius;
    }

    public function move($offset) {
        $this->position = $this->math->add($this->position, $offset);
        $this->setPosition($this->position);
    }
}