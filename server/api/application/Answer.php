<?php

class Answer {
    static $CODES = array(
        '101' => 'Param method not setted',
        '102' => 'Method not found',
        '103' => 'Method has no implementation',
        '242' => 'Params not set fully',
        '243' => 'Incorrect data about circles',
        '303' => 'Incorrect number of points',
        '404' => 'not found',
        '500' => "You don't have enough rights",
        '1001' => 'Is it unique login?',
        '1002' => 'Wrong login or password',
        '1003' => 'Error to logout user',
        '1004' => 'Error to register user',
        '1005' => 'User is no exists',
        '1007' => 'token is invalid',
        '1105' => 'Lobby is no exists',
        '605' => 'invalid teamId',
        '666' => 'incorrect params',
        '700' => 'No skins',
        '701' => 'Skin is not found',
        '705' => 'User is not found',
        '706' => 'text message is empty',
        '707' => 'could not send message', // e-mail;
        '708' => 'invalid code from E-mail',
        '709' => ' session did not start or you need use previous method',
        '710' => 'the user is already in the lobby',
        '711' => 'the user is not the lobby creator',
        '712' => 'the user is not a lobby member',
        '713' => 'the user is already the lobby creator',
        '714' => 'the creator of the group cannot leave it',
        '715' => 'the lobby is not open',
        '800' => 'not found object',
        '801' => 'unknown state',
        '802' => 'game is already exists',
        '805' => 'game is no exists',
        '808' => 'status is already ready',
        '809' => 'status is not ready',
        '810' => 'gamer is no exists',
        '905' => 'gamer is already connected to game',
        '1001' => 'params login or password not set',
        '1005' => 'Other user is playing wright now. If you doesn`t, please change the password',
        '1006' => 'user with this email is already registered',
        '9000' => 'unknown error'
    );

    static function response($data) {
        if ($data) {
            if (!is_bool($data) && array_key_exists('error', $data)) {
                $code = $data['error'];
                return [
                    'result' => 'error',
                    'error' => [
                        'code' => $code,
                        'text' => self::$CODES[$code]
                    ]
                ];
            }
            return [
                'result' => 'ok',
                'data' => $data
            ];
        }
        $code = 9000;
        return [
            'result' => 'error',
            'error' => [
                'code' => $code,
                'text' => self::$CODES[$code]
            ]
        ];
    }
}