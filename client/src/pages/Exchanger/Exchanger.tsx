import React, { useContext, useEffect } from "react";
import { IBasePage, PAGES } from "../PageManager";
import { StoreContext } from "../../App";
import { Button } from "../../components";
import './Exchanger.scss';

const Exchanger: React.FC<IBasePage> = (props: IBasePage) => {

    const backClickHandler = () => props.setPage(PAGES.MAIN_MENU);

    return (
        <div>
            <Button onClick={backClickHandler} text='Назад' />
        </div>
    );
}

export default Exchanger;