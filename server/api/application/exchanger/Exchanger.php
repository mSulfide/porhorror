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
        if (!$lot) {return ['error' => 820];}
        
        if ($lot->owner_id === $userId) {return ['error' => 821];}

        $this->db->deleteLot($lotId);
        $this->db->updateSlotState($lot->sell_inv_id, 'inventory');
        $this->db->updateExchangerHash(md5(rand()));
        $this->db->updateInventoryHash(md5(rand()), $userId);
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
            $this->db->updateInventoryHash(md5(rand()), $sellerId);
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
            
            $date1 = $this->db->getLotTime($lot->id);
            $date2 = new DateTime();
            $interval = $date2->diff($date1);
            $totalSeconds = ($interval->days * 86400) + ($interval->h * 3600) + ($interval->i * 60) + $interval->s;

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
            $lot->time = $totalSeconds;
        }

        return [
            'lots' => $lots,
            'hash' => $currentHash
        ];
    }

    public function getItemsList() {

        return $this->db->getItemsList();
    }

    public function exchange($myUserId, $lotId) {
        $lot = $this->db->getLotById($lotId);
        if (!$lot) { return ['error' => 807]; }
        
        $ownerId = $this->db->getUserById($lot->seller_id)->id;
        $myInventory = $this->db->getInventory($myUserId);

        $myItemId = -1;
        foreach ($myInventory as $item) {
            if ($item->itemId == $lot->need_item_id) {
                $myItemId = $item->id;
                break;
            }
        }
        if ($myItemId < 0) return ["error" => $myItemId]; //823
        
        $this->db->changeItemOwner($lot->sell_inv_id, $myUserId);
        $this->db->changeItemOwner($myItemId, $ownerId);
        $this->db->updateLotStatus($lotId, 'accepted');
        $this->db->updateSlotState($lot->sell_inv_id, 'inventory');
        $this->db->updateExchangerHash(md5(rand()));
        $this->db->updateInventoryHash(md5(rand()), $myUserId);

        return true;
    }

}