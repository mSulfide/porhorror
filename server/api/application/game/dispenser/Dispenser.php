<?php

class Dispenser extends GameObject {
    private $db;
    private $game;
    private int $id, $objectId, $itemId, $gamerId;

    public function __construct($db, $id, $game) {
        $this->db = $db;
        $this->id = $id;
        $this->game = $game;

        $params = $this->db->getDispenserById($this->id);
        $this->objectId = $params->object_id;
        $this->itemId = $params->item_id;
        $this->gamerId = $params->gamer_id;
        
        parent::__construct($db, $params->object_id);
    }

    // геттеры
    public function getObjectId() {
        return $this->objectId;
    }

    public function getItemId() {
        return $this->itemId;
    }

    public function getGamerId() {
        return $this->gamerId;
    }

    public function action(Gamer $gamer) {
        if ($gamer->id === $this->gamerId) {
            $this->dropItem($gamer);
        }
    }

    public function dropItem() {
        $this->game->dropItem($this->itemId);
    }
}