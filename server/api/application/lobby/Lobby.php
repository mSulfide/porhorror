<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function getLobbyByUserId($userId) {
        return $this->db->getLobbyByUserId($userId);
    }

    public function startGame($lobbyId) {
        $this->db->startGame($lobbyId);
        return true;
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

    public function isCreator($userId, $lobbyId) {
        return $this->db->isCreator($userId, $lobbyId);
    }

    public function deleteGroup($lobbyId, $userId) {
        $lobby = $this->db->getLobbyById($lobbyId);
        if ($lobby && $lobby->creator_id == $userId) {
            $this->db->removeMembersFromLobby($lobbyId);
            $this->db->removeLobby($lobbyId);
            return true; 
        }
        return ['error' => 710]; 
    }
}