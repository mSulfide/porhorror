<?php

class Dispenser extends GameObject {
    private $db;
    private $game;
    private int $id, $object_id, $item_id, $gamer_id;

    public function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;
        $this->game = new Game();

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
        $gamerId = $gamer->getId();
        $this->dropItem($gamerId);
    }

    public function dropItem($gamerId) {
        $gamer = $this->db->getGamerById($gamerId);
        $gameId = $this->db->getGameIdByGamerId($gamerId);
        if ($gamer->id === $this->gamer_id) {
            $this->game->dropItem($gameId, $this->item_id);
        }
    }
}