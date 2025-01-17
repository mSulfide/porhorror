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

    public function addLotComment($user, $lotId, $comment) {
        $lot = $this->db->getLotById($lotId);
        if ($lot) {
            $this->db->addLotComment($lotId, $user->id, $comment);
            return true;
        }
        return ['error' => 807]; 
    }    

    public function removeLot($user, $lotId) {
        $lot = $this->db->getLotById($lotId);
        if ($lot) {
            
            if ($lot->user_id == $user->id) {
                $this->db->updateLotStatus($lotId, 'removed'); 
                return true;
            } else {
                return ['error' => 806];
            }
        }
        return ['error' => 807];
    }
    
}