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

    public function createGroup($name, $token) { 
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $newGroup = $this->db->createGroup($name, $user->id);
            return true;
        }
        return ['error' => 705];
    }
}