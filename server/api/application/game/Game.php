<?php

class Game {
    function __construct($db) {
        $this->db = $db;
    }

    private function addUser($gameId, $userId) {
        $objectId = $this->db->createObject($gameId);
        $this->db->addGamer($objectId, $userId);
    }

    public function connect($gameId, $userId) {
        $gamer = $this->db->getGamerByUserId($userId);
        if (!$gamer) {
            $lobby = $this->db->getLobbyByUserId($userId);
            if ($lobby->game_id === $gameId) {
                $this->db->removeMemberFromLobby($lobby->id, $userId);
                $this->addUser($gameId, $userId);
                return true;
            }
            return ['error' => 500];
        }
        return ['error'=> 905];
    }
}