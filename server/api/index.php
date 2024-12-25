<?php

error_reporting(1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once('application/Answer.php');
require_once('application/Application.php');

function result($params) {
    $method = $params['method'];
    if ($method) {
        $app = new Application();
        switch ($method) {
            // user
            case 'autoLogin': return $app->autoLogin($params);
            case 'login': return $app->login($params);
            case 'logout': return $app->logout($params);
            case 'registration': return $app->registration($params);
            // chat
            case 'sendMessage': return $app->sendMessage($params);
            case 'getMessages': return $app->getMessages($params); // loop
            // math
            case 'derivative': return $app->derivative($params);
            case 'spline': return $app->spline($params);
            case 'getCirclesIntersect': return $app->getCirclesIntersect($params);
            case 'getIntersectionPoint': return $app->getIntersectionPoint($params);

            // инвентарь
            case 'getInventory': return $app->getInventory($params);
            case 'changeInventory': return $app->changeInventory($params);
            case 'equipItem': return $app->equipItem($params);
            case 'takeOffItem': return $app->takeOffItem($params);
            // лобби
            case 'updateGroups': return $app->updateGroups($params); // loop
            case 'createGroup': return $app->createGroup($params);
            case 'deleteGroup': return $app->deleteGroup($params);
            case 'joinToGroup': return $app->joinToGroup($params);
            case 'leaveGroup': return $app->leaveGroup($params);
            case 'dropFromGroup': return $app->dropFromGroup($params);
            case 'startGame': return $app->startGame($params);
            // игра
            case 'updateScene': return $app->updateScene($params); // loop
            case 'getRoom': return $app->getRoom($params);
            case 'getTasks': return $app->getTasks($params);
            case 'move': return $app->move($params);
            case 'drop': return $app->drop($params);
            case 'pickup': return $app->pickup($params);
            case 'action': return $app->action($params);
            //обменник
            case 'createLot': return $app->createLot($params);
            case 'deleteLot': return $app->deleteLot($params);
            case 'addLotItem': return $app->addLotItem($params);
            case 'removeLotItem': return $app->removeLotItem($params);
            case 'provideConsent': return $app->provideConsent($params);
            case 'removeConsent': return $app->removeConsent($params);
            case 'addLotComment': return $app->addLotComment($params);
            case 'updateLots': return $app->updateLots($params);

            default: return ['error' => 102];
        }
    }
    return ['error' => 101];
}

echo json_encode(Answer::response(result($_GET)), JSON_UNESCAPED_UNICODE);
