<?php

class Gamer extends GameObject {
    private $math;
    private int $userId;
    private GameObject $object;
    private float $axisX, $axisY;
    private bool $isAction;
    
    function __construct($userId) {
        $this->userId = $userId;

        $params = $this->db->getGamerByUserId($this->userId);

        $this->object = new GameObject(); // а что сюда пихать? типа GameObject($this->db, $params->objectId) ?

        $this->axisX = $params->axisX;
        $this->axisY = $params->axisY;
        $this->isAction = $params->isAction;

        $this->math = new Math();
    }

    // сеттер
    public function setIsAction($isAction) {
        $this->isAction = $isAction;
        $this->db->setIsAction($this->userId, $isAction); 
    }

    public function action() {
        if ($this->isAction === true) {
            $this->setIsAction(false);
            return true;
        } else {
            return false;
        }
    }

    public function move($distance) {
        $direction = new Point($this->axisX, $this->axisY);
        $movement = $this->math->mlt($direction, $distance);
        $this->object->position = $this->math->add($this->object->position, $movement);
    }

    public function update($deltaTime) {
        $this->object->velocity = new Point($this->axisX, $this->axisY);
    }
}
