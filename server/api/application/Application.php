<?php
require_once ('db/DB.php');
require_once ('user/User.php');
require_once ('chat/Chat.php');
require_once ('physic/Physic.php');

class Application {
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
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
        if ($params['login'] && $params['password'] && $params['name']) {
            return $this->user->registration($params['login'], $params['password'], $params['name']);
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

    public function getCirclesIntersection($params) {
        if (!isset($params['circle1']) || !isset($params['circle2'])) {
            return ['error' => 242];
        }
    
        $circle1Data = $params['circle1'];
        $circle2Data = $params['circle2'];
    
        if (!isset($circle1Data['x'], $circle1Data['y'], $circle1Data['radius']) ||
            !isset($circle2Data['x'], $circle2Data['y'], $circle2Data['radius'])) {
            return ['error' => 243];
        }
    
        $circle1 = new Circle(new TPoint($circle1Data['x'], $circle1Data['y']), $circle1Data['radius']);
        $circle2 = new Circle(new TPoint($circle2Data['x'], $circle2Data['y']), $circle2Data['radius']);
    
        $intersectionPoint = Physic::getIntersectionPoint($circle1, $circle2);
    
        if ($intersectionPoint) {
            return [
                'x' => $intersectionPoint->x,
                'y' => $intersectionPoint->y,
            ];
        } else {
            return []; 
        }
    }
    
}