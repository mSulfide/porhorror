<?php

class Gamer extends GameObject {
    private $db;
    private int $id, $userId;
    private GameObject $object;
    private float $axisX, $axisY;
    private bool $isAction;
    
    function __construct($db, $id, $game) {
        $params = $db->getGamerById($id);

        $this->axisX = $params->axis_x;
        $this->axisY = $params->axis_y;
        $this->isAction = $params->is_action;
        $this->itemId = $params->item_id;

        $this->db = $db;
        $this->id = $id;
        $this->game = $game;

        parent::__construct($db, $params->object_id);
    }

    // сеттер
    public function setIsAction($isAction) {
        $this->isAction = $isAction;
        $this->db->setIsAction($this->userId, $isAction); 
    }

    // геттеры
    public function getId() {
        return $this->id;
    }

    public function getItemId() {
        return $this->itemId;
    }

    public function action() {
        if ($this->isAction === true) {
            $this->setIsAction(false);
            return true;
        } else {
            return false;
        }
    }

    public function setDirection($deltaTime) {
        $point = new Point($this->axisX, $this->axisY);
        parent::moveVelocity($point, $deltaTime * 1);
        $this->lookAt($this->math->add($point, $this->getPosition()));
    }

    public function setItem($itemId) {
        $this->itemId = $itemId;
        $this->db->setItem($itemId, $this->id);
    }

    public function dropItem($itemId) {
        $this->game->dropItem($itemId);
        $this->setItem(null);
    }
}
