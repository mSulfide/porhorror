<?php

class Exchanger {
    private $db;
    
    function __construct($db) {
        $this->db = $db;
    }
    
    public function provideConsent($userId) {
        $status = $this->db->getStatusExchange($userId);
        if ($status === 'not ready') {
            $this->db->provideConsent($userId);
            return true;
        }
        return ['error' => 808];
    }
    

    public function removeConsent($userId){
        $status = $this->db->getStatusExchange($userId);
        if($status === 'ready'){
            $this->db->removeConsent($userId);
            return true;
        }
        return ['error'=> '809'];
    }

    public function addLotComment($token, $lotId, $comment) {
        $user = $this->db->getUserByToken($token);
        if (!$user) {
            return ['error' => 705];
        }

        $lot = $this->db->getLotById($lotId);
        if (!$lot) {
            return ['error' => 807]; 
        }

        $this->db->addLotComment($lotId, $user->id, $comment);
        return true;
    }

}