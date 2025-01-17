<?php

class DroppedItem extends GameObject {
    private $db;
    private int $id, $object_id, $item_id;
    private string $status;

    public function __construct($db, $id) {
        $this->db = $db;
        $this->id = $id;

        $params = $this->db->getItemById($this->id); 
        $this->objectId = $params->object_id;
        $this->itemId = $params->item_id;
        $this->status = $params->status;
        
        parent::__construct($db, $params->object_id);
    }

    // геттеры
    public function getObjectId() {
        return $this->objectId;
    }

    public function getItemId() {
        return $this->itemId;
    }

    public function getStatus() {
        return $this->status;
    }
}
