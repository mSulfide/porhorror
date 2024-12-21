<?php

class Exchanger {
    private $db;
    
    function __construct($db) {
        $this->db = $db;
    }
}