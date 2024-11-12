<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function joinToGroup($userId, $lobbyId) {
        
        $lobby = $this->db->getGroupById($lobbyId);
        if (!$lobby) {
            return ['error' => 229]; 
        }
        
        $existingEntry = $this->db->getUser LobbyEntry($userId, $lobbyId);
        if ($existingEntry) {
            return ['error' => 230]; 
        }

        $this->db->addUser ToLobby($userId, $lobbyId);
        return [true];
    }
}
