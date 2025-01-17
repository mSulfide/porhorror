import React, { useContext, useEffect,useRef, useMemo,useState } from "react";
import { IBasePage, PAGES } from "../PageManager";
import { ServerContext, StoreContext } from '../../App';
import { Button } from "../../components";
import './Exchanger.scss';

const Exchanger: React.FC<IBasePage> = (props: IBasePage) => {
    const backClickHandler = () => props.setPage(PAGES.MAIN_MENU);
    const exchangeClickHandler = () => {
    }

    return (
        <div>
            <h5>Exchanger</h5>
            <div>
                <div>
                    <Button onClick={exchangeClickHandler} text='Обменяться' />
                </div>
                <div>
                    <Button onClick={backClickHandler} text='Назад' />
                </div>
            </div>
        </div>
    );
}

export default Exchanger;