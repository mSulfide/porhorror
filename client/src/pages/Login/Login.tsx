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
                setPage(PAGES.CHAT);
            }
        }
    }
    const registrationClickHandler = () => setPage(PAGES.REGISTRATION);
    const backClickHandler = () => setPage(PAGES.PRELOADER);

    return (<div className='login'>
        <div className="login-heading">Вход</div>
        <div className='login-wrapper'>
            <div className='login-inputs'>
                <input ref={loginRef} placeholder='Имя пользователя' />
                <input ref={passwordRef} placeholder='Пароль' type='password' />
            </div>
            <div className="login-link-container">
                <span>Нет аккаунта?<a href="#" onClick={registrationClickHandler} className="underline-button">Зарегистрироваться</a></span>
                </div>
            <div className='login-buttons'>
                <Button onClick={loginClickHandler} text='Далее' />
                </div>
            </div>
        </div>)
}

export default Login;