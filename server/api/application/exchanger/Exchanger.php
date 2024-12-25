<?php

require_once 'DB.php';

class Exchanger {
    private $db;
    
    function __construct($db) {
        $this->db = $db;
    }

    public function provideConsent($userId) {
        $status = $this->db->getStatusExchange($userId);
        if ($status === 'not ready') {
            $this->db->provideConsent($userId);
            return ['success' => true]; 
        }
        return ['error' => 808]; 
    }

    public function removeConsent($userId) {
        $status = $this->db->getStatusExchange($userId);
        if ($status === 'ready') {
            $this->db->removeConsent($userId);
            return ['success' => true]; 
        }
        return ['error' => '809']; 
    }

    public function removeLotFromExchange($userId, $lotId) {
        $slot = $this->db->getSlotById($lotId);
        if ($slot && $slot->user_id == $userId) {
            $this->db->updateSlotState($lotId, 'inventory');
            return ['success' => true]; 
        }
        return ['error' => 810]; 
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? null;
    $userId = $_POST['user_id'] ?? null;

    if (!$action || !$userId) {
        echo json_encode(['error' => 'Missing required parameters.']);
        exit;
    }

    $db = new DB();
    $exchanger = new Exchanger($db);

    switch ($action) {
        case 'remove_consent':
            $result = $exchanger->removeConsent($userId);
            break;

        case 'provide_consent':
            $result = $exchanger->provideConsent($userId);
            break;

        case 'remove_lot':
            $lotId = $_POST['lot_id'] ?? null;
            if (!$lotId) {
                echo json_encode(['error' => 'Missing lot_id parameter.']);
                exit;
            }
            $result = $exchanger->removeLotFromExchange($userId, $lotId);
            break;

        default:
            echo json_encode(['error' => 'Invalid action specified.']);
            exit;
    }

   
    echo json_encode($result);
} else {
    
    echo json_encode(['error' => 'Invalid request method.']);
}
?>
