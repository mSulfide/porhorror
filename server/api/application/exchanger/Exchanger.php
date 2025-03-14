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

    public function deleteLot($userId, $lotId) {
        $lot = $this->db->getLotById($lotId);
        if ($lot && $lot->owner_id === $userId) { 
            $this->db->deleteLot($lotId);
            return true;
        }
        return ['error' => 807];
    }
    
    public function createLot($user, $itemsToGive, $itemsToReceive) {
        $inventory = $this->db->getInventory($user->id);
        foreach ($itemsToGive as $item) {
            if (!in_array($item, array_column($inventory, 'id'))) {
                return ['error' => 810]; 
            }
        }
        $lotId = $this->db->createLot($user->id);
        foreach ($itemsToGive as $itemId) {
            $this->db->addLotItem($lotId, $itemId, 'give');
        }
        foreach ($itemsToReceive as $itemId) {
            $this->db->addLotItem($lotId, $itemId, 'receive');
        }
        return ['lotId' => $lotId];
    }
    
}