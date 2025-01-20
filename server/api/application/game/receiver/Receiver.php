<?php

class Receiver extends GameObject {
    private $db;
    private int $id, $gameItemId, $gamerId;

    public function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;

        $params = $this->db->getReceiverById($this->id); 
        $this->gameItemId = $params->game_item_id;
        $this->gamerId = $params->gamer_id;
        
        parent::__construct($db, $params->object_id);
    }

    public function action(Gamer $gamer) {
        if ($gamer->id === $this->gamerId) {
            $this->putItem($gamer);
        }
    }

    public function putItem(Gamer $gamer) {
        $itemId = $gamer->getItemId();
        if ($itemId === $this->gameItemId) {
            $gamer->setItem(null);
        }
        
    }
}