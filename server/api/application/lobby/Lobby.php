<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function getLobbyByUserId($userId) {
        return $this->db->getLobbyByUserId($userId);
    }

    public function startGame($lobbyId, $userId) {
        if($this->db->isCreator($userId, $lobbyId)) {
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
            $this->db->updateLobbyHash(md5(rand()));
            return true;
        }
        return ['error' => 1105];
    }

    public function isCreator($userId, $lobbyId) {
        return $this->db->isCreator($userId, $lobbyId);
    }

    public function deleteGroup($lobbyId, $userId) {
        if ($this->isCreator($userId, $lobbyId)) {
            $this->db->removeMembersFromLobby($lobbyId);
            $this->db->removeLobby($lobbyId);
            $this->db->updateLobbyHash(md5(rand()));
            return true; 
        }
        return ['error' => 711]; 
    }

    public function joinToGroup($lobbyId, $userId) {
        $lobby = $this->getLobbyByUserId($userId);
        if (!$lobby->id) {
            $this->db->addMemberToLobby($lobbyId, $userId, 0);
            $this->db->updateLobbyHash(md5(rand()));
            return true;
        }
        return ['error' => 710];
    }

    public function leaveGroup($userId, $lobbyId) {
        if ($this->isCreator($userId, $lobbyId)) {
            $this->deleteGroup($lobbyId, $userId);
        } else {
            $this->db->removeMemberFromLobby($lobbyId, $userId);
        }
        $this->db->updateLobbyHash(md5(rand()));
        return true;
    }

    public function dropFromGroup($creatorId, $userId) {
        $lobby = $this->getLobbyByUserId($creatorId);
        if ($lobby) {
            if ($this->isCreator($creatorId, $lobby->id)) {
                $this->db->removeMemberFromLobby($lobby->id, $userId);
                $this->db->updateLobbyHash(md5(rand()));
                return true;
            }
            return ['error' => 711];
        }
        return ['error' => 1105];
    }

    public function updateGroup($hash, $lobby) {
        if ($hash === $lobby->hash) {
            return [
                'hash' => $hash
            ];
        }
        $users = $this->db->getUsersFromLobby($lobby->id);
        return [
            'id' => $lobby->id,
            'name' => $lobby->name,
            'users' => $users,
            'hash' => $lobby->hash
        ];
    }
}