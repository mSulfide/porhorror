<?php

class GameObject {
    private $db;
    private int $id;
    private Point $position, $velocity;
    private float $radius, $angle;
    private string $image;

    protected $math;

    function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;

        $params = $this->db->getGameObjectById($this->id);
        $this->position = new Point($params->x, $params->y);
        $this->velocity = new Point($params->velocity_x, $params->velocity_y);
        $this->angle = $params->angle;
        $this->radius = $params->radius;
        $this->image = $params->image;

        $this->math = new Math();
    }

    // двигает вектор скорости к желаемому направлению (desiredVelocity) на дельту (delta)
    public function moveVelocity($desiredVelocity, $delta) { 
        $sub = $this->math->sub($desiredVelocity, $this->velocity);
        if ($this->math->modl($sub) > $delta) {
            $this->setVelocity($this->math->add($this->math->mlt($this->math->norm($sub), $delta), $this->velocity));
        } else {
            $this->setVelocity($desiredVelocity);
        }
    }

    // сеттеры
    public function setPosition($position) {
        $this->position = $position;
        $this->db->setPosition($this->id, $position);
    }

    public function setVelocity($velocity) {
        $this->velocity = $velocity;
        $this->db->setVelocity($this->id, $velocity);
    }

    public function setAngle($angle) {
        $this->angle = $angle;
        $this->db->setVelocity($this->id, $angle);
    }

    public function setRadius($radius) {
        $this->radius = $radius;
        $this->db->setRadius($this->id, $radius);
    }

    public function setImage($image) {
        $this->image = $image;
        $this->db->setImage($this->id, $image);
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

    public function getImage() {
        return $this->image;
    }

    public function move($deltaTime) {
        $offset = $this->math->mlt($this->velocity, $deltaTime);
        $this->setPosition($this->math->add($this->position, $offset));
    }

    public function lookAt($point) {
        $angle = $this->math->getAngle($this->math->sub($point, $this->position));
        $this->setAngle($angle);
    }
}