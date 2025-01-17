<?php

class Gamer extends GameObject {
    private $db;
    private int $id, $userId;
    private GameObject $object;
    private float $axisX, $axisY;
    private bool $isAction;
    private string $handStatus;
    
    function __construct($db, $id) {
        $params = $db->getGamerById($id);

        $this->axisX = $params->axis_x;
        $this->axisY = $params->axis_y;
        $this->isAction = $params->is_action;
        $this->itemId = $params->item_id;
        $this->handStatus = $params->hand_status;

        $this->db = $db;
        $this->id = $id;

        parent::__construct($db, $params->object_id);
    }

    // сеттер
    public function setIsAction($isAction) {
        $this->isAction = $isAction;
        $this->db->setIsAction($this->userId, $isAction); 
    }

    // геттер
    public function getId() {
        return $this->id;
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

    public function setItem($userId, $itemId) {
        $gamer = $this->db->getGamerByUserId($userId);
        if ($gamer) {
            if ($gamer->hand_status === 'empty') {
                $this->db->setItem($itemId, $gamer->id);
                return true;
            }
            return ['error' => 906];
        }
        return ['error' => 810];
    }
}
