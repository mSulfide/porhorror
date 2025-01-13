<?php

class Gamer extends GameObject {
    private $db;
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

    public function move($deltaTime) {
        $this->moveVelocity(new Point($this->axisX, $this->axisY), $deltaTime * 1);
        parent::move($deltaTime);
    }
}
