<?php

class Dispenser extends GameObject {
    private $db;
    private $game;
    private int $id, $itemId, $gamerId;

    public function __construct($db, $id, $game) {
        $this->db = $db;
        $this->id = $id;
        $this->game = $game;

        $params = $this->db->getDispenserById($this->id);
        $this->itemId = $params->item_id;
        $this->gamerId = $params->gamer_id;
        
        parent::__construct($db, $params->object_id);
    }

    public function action(Gamer $gamer) {
        if ($gamer->getId() === $this->gamerId) {
            $this->dropItem();
        }
    }

    public function dropItem() {
        $this->game->dropItem($this->itemId);
    }
}