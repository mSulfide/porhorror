<?php

class User {
    private $db;
    function __construct($db) {
        $this->db = $db;
    }

    public function getUser($token) {
        return $this->db->getUserByToken($token);
    }

    public function autoLogin($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'token' => $token
            ];
        }
        return ['error' => 1007]; 
    }

    public function login($login, $hash, $rnd) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            if (md5($user->password.$rnd) === $hash) {
                $token = md5(rand());
                $this->db->updateToken($user->id, $token);
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'token' => $token
                ];
            }
            return ['error' => 1002];
        }
        return ['error' => 1005];
    }

    public function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return ['error' => 1003];
    }

    public function registration($login, $hash, $name) {
        $user = $this->db->getUserByLogin($login, $hash);
        if ($user) {
            return ['error' => 1001];
        }
        $this->db->registration($login, $hash, $name);
        $user = $this->db->getUserByLogin($login, $hash);
        if ($user) {
            $token = md5(rand());
            $this->db->updateToken($user->id, $token);
            return [
                'id' => $user->id,
                'name' => $user->name,
                'token' => $token
            ];
        }
        return ['error' => 1004];
    }
}