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
        return ['error' => 705];
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