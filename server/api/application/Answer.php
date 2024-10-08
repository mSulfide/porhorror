<?php

class Answer {
    static $CODES = array(
        '101' => 'Param method not setted',
        '102' => 'Method not found',
        '242' => 'Params not set fully',
        '705' => 'User is not found',
        '1001' => 'Is it unique login?',
        '1002' => 'Wrong login or password',
        '1003' => 'Error to logout user',
        '1004' => 'Error to register user',
        '1005' => 'User is no exists',
        '404' => 'not found',
        '605' => 'invalid teamId',
        '700' => 'No skins',
        '701' => 'Skin is not found',
        '706' => 'text message is empty',
        '707' => 'could not send message', // e-mail;
        '708' => 'invalid code from E-mail',
        '709' => ' session did not start or you need use previous method',
        '800' => 'not found object',
        '801' => 'unknown state',
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