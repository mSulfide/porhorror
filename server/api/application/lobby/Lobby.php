<?php

class Lobby {
    function __construct($db) {
        $this->db = $db;
    }

    public function startGame($userId) {
        $lobby = $this->db->getLobbyByUserId($userId);
        if ($lobby) {
            if($this->isCreator($userId, $lobby->id)) {
                $gameId = $this->db->createGame(md5(rand()));
                $this->db->startGame($lobby->id, $gameId);
                $this->db->updateLobbyHash(md5(rand()));
                return true;
            }
            return ['error' => 500];
        }
        return ['error' => 1105];
    }

    public function updateGroups($userId, $hash) {
        $currentHash = $this->db->getLobbyHash();
        if ($hash === $currentHash) {
            return [
                'hash' => $hash
            ];
        }
        $lobbies = $this->db->getLobbies();
        $gameId = $this->db->getConnectId($userId);
        return [
            'gameId' => $gameId,
            'lobbies' => $lobbies,
            'hash' => $currentHash
        ];
    }
    
    public function createGroup($name, $userId) { 
        $lobby = $this->db->getLobbyByUserId($userId);
        if (!($this->isCreator($userId, $lobby->id))) {
            $group = $this->db->createGroup($name, $userId);
            if ($group) {
                $this->db->addMemberToLobby($group, $userId, true);
                $this->db->updateLobbyHash(md5(rand()));
                return true;
            }
            return ['error' => 1105];
        }
        return ['error' => 713];
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
        $lobby = $this->db->getLobbyById($lobbyId);
        if ($lobby) {
            if ($lobby->status === 'open') {
                $existingLobby = $this->db->getLobbyByUserId($userId);
                if (!$existingLobby) {
                    $this->db->addMemberToLobby($lobbyId, $userId, 0);
                    $this->db->updateLobbyHash(md5(rand()));
                    return true;
                }
                return ['error' => 710];
            } else {
                return ['error' => 715];
            }
        }
        return ['error' => 1105];
    }

    public function leaveGroup($userId) {
        $lobby = $this->db->getLobbyByUserId($userId);
        if ($lobby) {
            if ($this->isCreator($userId, $lobby->id)) {
                return ['error' => 714];
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