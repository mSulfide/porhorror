<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function startGame($userId) {
        $lobby = $this->db->getLobbyByUserId($userId);
        if ($lobby) {
            if($this->isCreator($userId, $lobby->id)) {
                $this->db->startGame($lobby->id);
                return true;
            }
            return ['error' => 500];
        }
        return ['error' => 1105];
    }

    public function updateGroups($hash) {
        $currentHash = $this->db->getLobbyHash();
        if ($hash === $currentHash) {
            return [
                'hash' => $hash
            ];
        }
        $lobbies = $this->db->getLobbies();
        return [
            'lobbies' => $lobbies,
            'hash' => $currentHash
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

    public function deleteGroup($userId) {
        $lobby = $this->db->getLobbyByUserId($userId);
        if ($lobby) {
            if ($this->isCreator($userId, $lobby->id)) {
                $this->db->removeMembersFromLobby($lobby->id);
                $this->db->removeLobby($lobby->id);
                $this->db->updateLobbyHash(md5(rand()));
                return true; 
            }
            return ['error' => 711]; 
        }
        return ['error' => 1105];
    }

    public function joinToGroup($lobbyId, $userId) {
        $lobby = $this->db->getLobbyByUserId($userId);
        if (!$lobby->id) {
            $this->db->addMemberToLobby($lobbyId, $userId, 0);
            $this->db->updateLobbyHash(md5(rand()));
            return true;
        }
        return ['error' => 710];
    }

    public function leaveGroup($userId) {
        $lobby = $this->db->getLobbyByUserId($userId);
        if ($lobby) {
            if ($this->isCreator($userId, $lobby->id)) {
                $this->deleteGroup($userId);
            } else {
                $this->db->removeMemberFromLobby($lobby->id, $userId);
            }
            $this->db->updateLobbyHash(md5(rand()));
            return true;
        }
        return ['error' => 1105];
    }

    public function dropFromGroup($creatorId, $userId) {
        $lobby = $this->db->getLobbyByUserId($creatorId);
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
            'users' => $users,
            'hash' => $lobby->hash
        ];
    }

    private function isCreator($userId, $lobbyId) {
        $users = $this->db->getUsersFromLobby($lobbyId);
        foreach ($users as $user) {
            if ($user->id === $userId && $user->creator == 1) {
                return true;
            }
        }
        return false;
    }
}