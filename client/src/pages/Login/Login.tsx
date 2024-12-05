import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

import './Login.scss';

const Login: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginClickHandler = async () => {
        if (loginRef.current && passwordRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            if (login && password && await server.login(login, password)) {
                setPage(PAGES.MAIN_MENU);
            }
        }
    }
    const registrationClickHandler = () => setPage(PAGES.REGISTRATION);
    const backClickHandler = () => setPage(PAGES.PRELOADER);

    return (<div className='login'>
        <div>Логин</div>
        <div className='login-wrapper'>
            <div className='login-inputs'>
                <input ref={loginRef} placeholder='логин' />
                <input ref={passwordRef} placeholder='пароль' type='password' />
            </div>
            <div className='login-buttons'>
                <Button onClick={loginClickHandler} text='Авторизоваться' />
                <Button onClick={registrationClickHandler} text='Регистрация' />
                <Button onClick={backClickHandler} text='Назад' />
            </div>
        </div>
    </div>)
}

export default Login;