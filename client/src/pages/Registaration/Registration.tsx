import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

import './Registration.scss';

const Registration: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordSecondRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);

    const registrationClickHandler = async () => {
        if (loginRef.current && passwordRef.current && passwordSecondRef.current && nameRef.current) {
            const login = loginRef.current.value;
            const password = passwordRef.current.value;
            const passwordSecond = passwordSecondRef.current.value;
            const name = nameRef.current.value;
            if (name && login && password && password === passwordSecond && await server.registration(login, password, name)) {
                setPage(PAGES.MAIN_MENU);
            }
        }
    }
    const backClickHandler = () => setPage(PAGES.LOGIN);

    return (<div className='wrapper-registration'>
    <div className='registration'>
        <div className="registration-heading">Регистрация</div>
            <div className='registration-inputs'>
                <input ref={nameRef} placeholder='Имя пользователя' />
                <input ref={loginRef} placeholder='Логин' />
                <input ref={passwordRef} placeholder='Пароль' type='password' />
                <input ref={passwordSecondRef} placeholder='Подтвердить пароль' type='password' />
            </div>
            <div className='registration-buttons'>
                <a href="#" onClick={backClickHandler} className="back-link"> &#8592; Вернуться назад </a>
                <Button onClick={registrationClickHandler} text='Далее' />
                
            </div>
        </div>
    </div>)
}

export default Registration;