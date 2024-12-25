<?php

require_once ('db/DB.php');
require_once ('user/User.php');
require_once ('chat/Chat.php');
require_once ('Math/Math.php');
require_once ('inventory/Inventory.php');
require_once ('lobby/Lobby.php');
require_once ('game/Game.php');
require_once ('exchanger/Exchanger.php');

class Application {
    private $user, $chat, $inventory, $lobby, $game, $exchanger, $math;

    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
        $this->inventory = new Inventory($db);
        $this->lobby = new Lobby($db);
        $this->game = new Game($db);
        $this->exchanger = new Exchanger($db);
        $this->math = new Math();
    }

    public function autoLogin($params) {
        if ($params['token']) {
            return $this->user->autoLogin($params['token']);
        }
        return ['error' => 242];
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
    
    public function equipItem($params) {
        if ($params['token'] && $params['slotId']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->inventory->equipItem($user->id, $params['slotId']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function takeOffItem($params) {
        if ($params['token'] && $params['slotId']) {
            $user = $this->user->getUser ($params['token']);
            if ($user) {
                return $this->inventory->takeOffItem($user->id, $params['slotId']);
            }
            return ['error' => 705]; 
        }
        return ['error' => 242]; 
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

    // игра
    public function updateScene($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->game->updateScene($user->id, $params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getRoom($params) {
        return ['error' => 103];
    }

    public function getTasks($params) {
        return ['error' => 103];
    }

    public function move($params) {
        if ($params['token'] && isset($params['axisX']) && isset($params['axisY'])) { //axisX
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->game->move($user->id, $params['axisX'], $params['axisY']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function drop($params) {
        return ['error' => 103];
    }

    public function pickup($params) {
        return ['error' => 103];
    }
    public function action($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->game->action($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    // для проверок
    public function check($params) {
        return $this->math->check();
    }

    //обменник
    public function createLot($params) {
        return ['error' => 103];
    }

    public function deleteLot($params) {
        return ['error' => 103];
    }

    public function addLotItem($params) {
        return ['error' => 103];
    }

    public function removeLotItem($params) {
        return ['error' => 103];
    }

    public function provideConsent($params) {
        if ($params['token']) {
            $user = $this->user->getUser ($params['token']);
            if ($user) {
                return $this->exchanger->provideConsent($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function removeConsent($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->exchanger->removeConsent($user->id);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function addLotComment($params) {
        if ($params['token'] && $params['lotId'] && $params['comment']) {
            return $this->exchanger->addLotComment($params['token'], $params['lotId'], $params['comment']);
        }
        return ['error' => 242];
    }

    public function updateLots($params) {
        return ['error' => 103];
    }
}