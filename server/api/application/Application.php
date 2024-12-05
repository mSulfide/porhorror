<?php

require_once ('db/DB.php');
require_once ('user/User.php');
require_once ('chat/Chat.php');
require_once ('Math/Math.php');
require_once ('inventory/Inventory.php');
require_once ('lobby/Lobby.php');
require_once ('game/Game.php');

class Application {
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
        $this->inventory = new Inventory($db);
        $this->lobby = new Lobby($db);
        $this->game = new Game($db);
    }

    public function autoLogin($params) {
        return ['error' => 103];
    }

    public function login($params) {
        if ($params['login'] && $params['hash'] && $params['rnd']) {
            return $this->user->login($params['login'], $params['hash'], $params['rnd']);
        }
        return ['error' => 242];
    }

    public function logout($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->logout($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function registration($params) {
        if ($params['login'] && $params['hash'] && $params['name']) {
            return $this->user->registration($params['login'], $params['hash'], $params['name']);
        }
        return ['error' => 242];
    }

    public function sendMessage($params) {
        if ($params['token'] && $params['message']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->sendMessage($user->id, $params['message']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getMessages($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->getMessages($params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function derivative($params){
        if ($params['func'] && $params['x'] && $params['eps']) {
            return $this->math->derivative($params['func'], $params['x'], $params['eps']);
        }
        return ['error' => 242];
    }

    public function spline(array $params){
        if ($params['points'] && is_array($params['points'])){
            return $this->math->spline($params['points']);
        }
        return ['error' => 242];
    }

    public function getCirclesIntersect($params) {
        if (isset($params['circle1']) && isset($params['circle2'])) {
            return $this->math->getCirclesIntersect($params['circle1'], $params['circle2']);
        }
        return ['error' => 242];
    }

    public function getIntersectionPoint($params) {
        if (isset($params['circle1']) && isset($params['circle2'])) {
            return $this->math->getIntersectionPoint($params['circle1'], $params['circle2']);
        }
        return ['error' => 242];
    }

    // инвентарь
    public function getInventory($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->inventory->getInventory($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function changeInventory($params) {
        return ['error' => 103];
    }

    //лобби
    public function startGame($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->lobby->startGame($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }
    
    public function updateGroups($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->lobby->updateGroups($params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function createGroup($params) {
        if ($params['name'] && $params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->lobby->createGroup($params['name'], $user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function deleteGroup($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->lobby->deleteGroup($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }
    
    public function joinToGroup($params) {
        if ($params['lobbyId'] && $params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->lobby->joinToGroup($params['lobbyId'], $user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function leaveGroup($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->lobby->leaveGroup($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }
    
    public function dropFromGroup($params) {
        if ($params['userId'] && $params['token']) {
            $creator = $this->user->getUser($params['token']);
            if ($creator) {
                return $this->lobby->dropFromGroup($creator->id, $params['userId']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    /*
    case 'changeInventory': return $app->changeInventory($params);
    // игра
    case 'updateScene': return $app->updateScene($params); // loop
    case 'getRoom': return $app->getRoom($params);
    case 'getTasks': return $app->getTasks($params);
    case 'move': return $app->move($params);
    case 'drop': return $app->drop($params);
    case 'pickup': return $app->pickup($params);
    */

}