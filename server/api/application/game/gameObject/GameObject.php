<?php

class GameObject {
    private $db, $math;
    private int $id;
    private Point $position, $velocity;
    private float $radius, $angle;

    function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;

        $this->paramsFromDB();

        $this->math = new Math();
    }

    private function paramsFromDB() {
        $params = $this->db->getGameObject($this->id);
        if ($params) {
            foreach ($params as $param) {
                $this->position = new Point($param->x, $param->y);
                $this->velocity = new Point($param->velocity_x, $param->velocity_y);
                $this->angle = $param->angle;
                $this->radius = $param->radius;
            }
        }
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