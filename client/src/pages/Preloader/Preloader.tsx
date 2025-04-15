import React, { useContext, useEffect } from "react";
import { IBasePage, PAGES } from "../PageManager";
import { StoreContext } from "../../App";

import './Preloader.scss';

const Preloader: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const store = useContext(StoreContext);

    useEffect(() => {
        setTimeout(() => store.loadResources(() => setPage(PAGES.LOGIN)), 3);
    });

    return (
        <div className="preloader">
            <div className="preloader-wrapper"></div>
            <div>
                <div className="preloader__dots" />
            </div>
            <span>Загрузка...</span>
            <section className="preloader__authors">
                <h1>Автор:</h1>
                <div className="authors_name alex"><span>Трусов Алексей</span></div>
            </section>
        </div>
    );
}

export default Preloader;