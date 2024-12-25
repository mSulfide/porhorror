<?php

class Gamer extends GameObject {
    private $math, $db;
    private int $id, $userId;
    private GameObject $object;
    private float $axisX, $axisY;
    private bool $isAction;
    
    function __construct($db, $id) {
        $params = $db->getGamerById($id);

        $this->axisX = $params->axis_x;
        $this->axisY = $params->axis_y;
        $this->isAction = $params->is_action;

        $this->db = $db;
        $this->id = $id;

        parent::__construct($db, $params->object_id);
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
        $this->move($movement);
    }
}
