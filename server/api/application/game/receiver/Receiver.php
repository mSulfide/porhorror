<?php

class Receiver extends GameObject {
    private $db;
    private int $id, $object_id, $game_item_id, $gamer_id;

    public function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;

        $params = $this->db->getReceiverById($this->id); 
        $this->objectId = $params->object_id;
        $this->gameItemId = $params->game_item_id;
        $this->gamerId = $params->gamer_id;
        
        parent::__construct($db, $params->object_id);
    }

    // геттеры
    public function getObjectId() {
        return $this->objectId;
    }

    public function getGameItemId() {
        return $this->gameItemId;
    }

    public function getGamerId() {
        return $this->gamerId;
    }

    public function action(Gamer $gamer) {
        $gamerId = $gamer->getId();
        $this->putItem($gamerId);
    }

    public function putItem(Gamer $gamer) {
        $gamerId = $gamer->getId();
        $this->db->putItem($gamerId);
    }

    /*public function dropItem($gamerId) {
        $gamer = $this->db->getGamerById($gamerId);
        $gameId = $this->db->getGameIdByGamerId($gamerId);
        if ($gamer->id === $this->gamer_id) {
            $this->game->dropItem($gameId, $this->item_id);
        }
    }*/
}