<?php

class Game {
    function __construct($db) {
        $this->db = $db;
    }

    private function addUser($gameId, $userId) {
        $objectId = $this->db->createObject($gameId);
        $this->db->addGamer($objectId, $userId);
    }
}