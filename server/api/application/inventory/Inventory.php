<?php

class Inventory {
    function __construct($db) {
        $this->db = $db;
    }

    public function getInventory($userId) {
        return $this->db->getInventory($userId);
    }

    //---------------------------------------------
    public function addToInventory($userId, $itemId) {
        // Проверяем, существует ли предмет
        if (!$this->db->itemExists($itemId)) {
            return false; 
        }
        // Добавляем предмет в инвентарь
        return $this->db->addItemToInventory($userId, $itemId);
    }

    public function removeFromInventory($userId, $itemId) {
        // Проверяем, есть ли предмет в инвентаре
        if (!$this->db->hasItemInInventory($userId, $itemId)) {
            return false; 
        }
        // Удаляем предмет из инвентаря
        return $this->db->removeItemFromInventory($userId, $itemId);
    }


}