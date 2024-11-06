import React, { useContext, useRef } from 'react';
import { ServerContext } from '../../App';
import Button from '../../components/Button/Button';
import { IBasePage, PAGES } from '../PageManager';

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
                setPage(PAGES.CHAT);
            }
        }
    }
    const backClickHandler = () => setPage(PAGES.LOGIN);

    return (<div className='registration'>
        <div>Регистрация</div>
        <div className='registration-wrapper'>
            <div className='registration-inputs'>
                <input ref={nameRef} placeholder='имя' />
                <input ref={loginRef} placeholder='логин' />
                <input ref={passwordRef} placeholder='пароль' type='password' />
                <input ref={passwordSecondRef} placeholder='повторите пароль' type='password' />
            </div>
            <div className='registration-buttons'>
                <Button onClick={registrationClickHandler} text='Зарегистрироваться' />
                <Button onClick={backClickHandler} text='Назад' />
            </div>
        </div>
    </div>)
}

export default Registration;