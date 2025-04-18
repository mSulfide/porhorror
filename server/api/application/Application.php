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

    private function checkParams($params, ...$keys) {
        if (is_object($params)) {
            $params = (array)$params;
        }
        $user = null;
        foreach ($keys as $key) {
            switch ($key) {
                case 'token': 
                    $token = $params[$key];
                    if (!$token) {
                        return ['error' => 250];
                    }
                    $user = $this->user->getUser($token);
                    if (!$user) {
                        return ['error' => 705];
                    }
                break;

                default: 
                    if (!isset($params[$key])) {
                        return ['error' => 242];
                    }
                break;
            }
        }
        return $user;
    }

    private function isError($params) {
        return is_array($params) && array_key_exists('error', $params); 
    }

    public function autoLogin($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->user->autoLogin($params['token']);
    }

    public function login($params) {
        $user = $this->checkParams($params, 'login', 'hash', 'rnd');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->user->login($params['login'], $params['hash'], $params['rnd']);
    }

    public function logout($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->user->logout($params['token']);
    }

    public function registration($params) {
        $user = $this->checkParams($params, 'login', 'hash', 'name');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->user->registration($params['login'], $params['hash'], $params['name']);
    }

    public function sendMessage($params) {
        $user = $this->checkParams($params, 'token', 'message');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->chat->sendMessage($user->id, $params['message']);
    }

    public function getMessages($params) {
        $user = $this->checkParams($params, 'token', 'hash');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->chat->getMessages($params['hash']);
    }
    
    // инвентарь
    public function getInventory($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->inventory->getInventory($user->id);
    }

    public function changeInventory($params) {
        $user = $this->checkParams($params, 'token', 'itemId', 'toEquip');
        if ($this->isError($user)) {
            return $user;
        }

        $toEquip = $params['toEquip'];

        if ($toEquip === "true") { 
            return $this->inventory->equipItem($user->id, $params['itemId']);
        }
        else if ($toEquip === "false") { 
            return $this->inventory->takeOffItem($user->id, $params['itemId']);
        }
        return ['error' => 666]; 
    }

    //лобби
    public function startGame($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->lobby->startGame($user->id);
    }
    
    public function updateGroups($params) {
        $user = $this->checkParams($params, 'token', 'hash');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->lobby->updateGroups($params['hash']);
    }

    public function createGroup($params) {
        $user = $this->checkParams($params, 'token', 'name');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->lobby->createGroup($params['name'], $user->id);
    }

    public function deleteGroup($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->lobby->deleteGroup($user->id);
    }
    
    public function joinToGroup($params) {
        $user = $this->checkParams($params, 'token', 'lobbyId');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->lobby->joinToGroup($params['lobbyId'], $user->id);
    }

    public function leaveGroup($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->lobby->leaveGroup($user->id);
    }
    
    public function dropFromGroup($params) {
        $user = $this->checkParams($params, 'token', 'userId');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->lobby->dropFromGroup($user->id, $params['userId']);
    }

    // игра
    public function updateScene($params) {
        $user = $this->checkParams($params, 'token', 'hash');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->game->updateScene($user->id, $params['hash']);
    }

    public function getRoom($params) {
        return ['error' => 103];
    }

    public function getTasks($params) {
        return ['error' => 103];
    }

    public function move($params) {
        $user = $this->checkParams($params, 'token', 'axisX', 'axisY');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->game->move($user->id, $params['axisX'], $params['axisY']);
    }

    public function drop($params) {
        return ['error' => 103];
    }

    public function pickup($params) {
        return ['error' => 103];
    }
    public function action($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->game->action($user->id);
           
    }

    // для проверок
    public function check($params) {
        return $this->game->endGame($params['gameId']);
    }

    //обменник
    /*public function createLot($params) {
        return ['error' => 103];
    }*/

    



    public function removeLotItem($params) {
        return ['error' => 103];
    }

    public function provideConsent($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->exchanger->provideConsent($user->id);
    }

    public function removeConsent($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->exchanger->removeConsent($user->id);
    }

    public function addLotComment($params) {
        $user = $this->checkParams($params, 'token', 'lotId', 'comment');
        if ($this->isError($user)) {
            return $user; 
        }
        return $this->exchanger->addLotComment($user, $params['lotId'], $params['comment']);
    }        
    
    public function updateLots($params) {
        return ['error' => 103];
    }

    public function deleteLot($params) {
        $user = $this->checkParams($params, 'token', 'lotId');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->exchanger->deleteLot($user, $params['lotId']);
    }

    public function createLot($params) {
        $user = $this->checkParams($params, 'token', 'sellItemId', 'needItemId');
        if ($this->isError($user)) {
            return $user;
        }
    
        return $this->exchanger->createLot($user->id, $params['sellItemId'], $params['needItemId']);
    }

    public function removeItemFromLot($params) {
        $user = $this->checkParams($params, 'token', 'lotId', 'itemId');
        if ($this->isError($user)) {
            return $user;
        }
    
        return $this->exchanger->removeItemFromLot($user->id, $params['lotId'], $params['itemId']);
    }
    public function addItemToInventory($params) {
        $user = $this->checkParams($params, 'token', 'itemId');
        if ($this->isError($user)) {
            return $user;
        }
    
        return $this->inventory->addItem($user->id, $params['itemId']);
    }
    
    public function removeItemFromInventory($params) {
        $user = $this->checkParams($params, 'token', 'slotId');
        if ($this->isError($user)) {
            return $user;
        }
    
        return $this->inventory->removeItem($params['slotId']);
    }
    
    public function checkInventorySpace($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
    
        return ['hasFreeSpace' => $this->inventory->hasFreeSpace($user->id)];
    }
    
    public function addLotItem($params) {
        $user = $this->checkParams($params, 'token', 'lotId', 'itemId', 'type');
        if ($this->isError($user)) {
            return $user;
        }
    
        return $this->exchanger->addLotItem($user, $params['lotId'], $params['itemId'], $params['type']);
    }

    public function updateExchanger($params) {
        $user = $this->checkParams($params, 'token', 'hash');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->exchanger->updateExchanger($params['hash']);
    }

    public function getItemsList($params) {
        $user = $this->checkParams($params, 'token');
        if ($this->isError($user)) {
            return $user;
        }
        return $this->exchanger->getItemsList();
    }

    public function exchange($params) {
        $user = $this->checkParams($params, 'token', 'lotId');
        if ($this->isError($user)) {
            return $user;
        }
        // return $this->exchanger->exchange();
    }

}
