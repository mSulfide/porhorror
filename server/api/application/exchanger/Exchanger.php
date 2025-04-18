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
        if (!$lot) {
            return ['error' => 807];
        }
        if ($lot->owner_id === $userId) return ['error' => 821];
        
        $result = $this->db->deleteLot($lotId);
        if ($result) {
            $this->db->updateSlotState($lot->sell_item_id, 'inventory');
        }
    }
    
    public function createLot($sellerId, $sellItemId, $needItemId) {
        $inventory = $this->db->getInventory($sellerId);
        
        $itemExists = false;
        foreach ($inventory as $item) {
            if ($item->id == $sellItemId) {
                $itemExists = true;
                break;
            }
        }
        if (!$itemExists) return ["error" => 821];

        // $itemExists = false;
        // foreach ($inventory as $item) {
        //     if ($item->item_id == $needItemId) {
        //         $itemExists = true;
        //         break;
        //     }
        // }
        // if (!$itemExists) return ["error" => 823];

        $slot = $this->db->getSlotById($sellItemId);
        if (!$slot | $slot->user_id !== $sellerId) {
            return ['error' => 820]; 
        }
    
        if ($slot->status === 'exchange') {
            return ['error' => 822]; 
        }

        $result = $this->db->createLot($sellerId, $sellItemId, $needItemId);
        if ($result) {
            $this->db->updateSlotState($sellItemId, 'exchange');
            $this->db->updateExchangerHash(md5(rand()));
            return [true];
        }
        return [false];
    }
    
    public function addLotItem($user, $lotId, $itemId, $type) {
        $lot = $this->db->getLotById($lotId);
        if (!$lot || $lot->user_id !== $user->id) {
            return ['error' => 807]; 
        }

        if ($type === 'give') {
            $inventory = $this->db->getInventory($user->id);
            $itemIds = array_column($inventory, 'id');
            if (!in_array($itemId, $itemIds)) {
                return ['error' => 810]; 
            }
        }
        $this->db->addLotItem($lotId, $itemId, $type);
        return true; 
    }

    public function removeItemFromLot($userId, $lotId, $itemId) {
        $lot = $this->db->getLotById($lotId);
        if (!$lot || $lot->user_id !== $userId) {
            return ['error' => 807]; 
        }
    
        $result = $this->db->removeLotItem($lotId, $itemId);
        if (is_array($result) && isset($result['error'])) {
            return $result; 
        }
    
        return true;
    }
    
    public function updateExchanger($hash) {
        $currentHash = $this->db->getExchangerHash();
        if ($hash === $currentHash) {
            return [
                'hash' => $hash
            ];
        }
        $lots = $this->db->getLots();

        foreach ($lots as &$lot) {
            $lot->sellItem = [
                'id' => $lot->id1,
                'name' => $lot->n1,
                'image' => $lot->i1
            ];
            $lot->needItem = [
                'id' => $lot->id2,
                'name' => $lot->n2,
                'image' => $lot->i2
            ];
        }

        return [
            'lots' => $lots,
            'hash' => $currentHash
        ];
    }

    public function getItemsList() {

        return $this->db->getItemsList();
    }

}