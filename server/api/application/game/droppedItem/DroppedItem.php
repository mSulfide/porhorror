<?php

class DroppedItem extends GameObject {
    private $db;
    private int $id, $objectId, $itemId;

    public function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;

        $params = $this->db->getItemById($this->id); 
        $this->objectId = $params->object_id;
        $this->itemId = $params->item_id;
        
        parent::__construct($db, $params->object_id);
    }

    // геттеры
    public function getObjectId() {
        return $this->objectId;
    }

    public function getItemId() {
        return $this->itemId;
    }

    public function deleteDroppedItem() {
        $this->db->deleteDroppedItem($this->id);
    }
}
