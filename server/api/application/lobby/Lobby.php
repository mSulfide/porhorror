<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function getLobbyByUserId($userId) {
        return $this->db->getLobbyByUserId($userId);
    }

    public function startGame($lobbyId) {
        if(true/*$this->isCreator*/) {
            $this->db->startGame($lobbyId);
            return true;
        }
        return false;
    }

    public function updateGroups($hash) {
        $currentHash = $this->db->getLobbyHash();
        if ($hash === $currentHash->lobby_hash) {
            return [
                'hash' => $hash
            ];
        }
        $lobbies = $this->db->getLobbies();
        return [
            'lobbies' => $lobbies,
            'hash' => $currentHash->lobby_hash
        ];
    }

    public function createGroup($name, $userId) { 
        $group = $this->db->createGroup($name, $userId);
        if ($group) {
            $this->db->addMemberToLobby($group, $userId, true);
            return true;
        }
        return ['error' => 1105];
    }
}