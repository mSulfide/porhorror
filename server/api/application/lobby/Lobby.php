<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function startGame($userId) {
        $lobby = $this->db->getLobbyByCreatorId($userId);
        if ($lobby) {
            $this->db->startGame($lobby->id);
            return true;
        }
        return ['error' => 1105];
    }
}