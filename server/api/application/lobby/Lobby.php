<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function joinToGroup($userId, $lobbyId) {
        
        $lobby = $this->db->getGroupById($lobbyId);
        if (!$lobby) {
            return ['error' => 242]; 
        }
        
        $existingEntry = $this->db->getUserLobbyEntry($userId, $lobbyId);
        if ($existingEntry) {
            return ['error' => 242]; 
        }

        $this->db->addUserToLobby($userId, $lobbyId);
        return true;
    }
}
