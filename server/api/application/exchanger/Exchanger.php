<?php

class Exchanger {
    private $db;
    
    function __construct($db) {
        $this->db = $db;
    }

    public function removeConsent($userId){
        $status = $this->db->getStatusExchange($userId);
        if($status === 'ready'){
            $this->db->removeConsent($userId);
            return true;
        }
        return ['error'=> '809'];
    }
}