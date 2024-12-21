import { useContext } from "react";
import { Button, Inventory, Lobby } from "../../components";
import { IBasePage, PAGES } from "../PageManager";
import { ServerContext, StoreContext } from "../../App";

import './MainMenu.scss';


const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    store.setChatHash('empty');
    store.setLobbyHash('empty');

    const settingsClickHandler = () => {
        // Add your settings handling logic here
    };

    const backClickHandler = async () => {
        await server.logout() && setPage(PAGES.LOGIN);
    };

    return (<div className="wrapper-menu">
        <div className="mainMenuContainer">
            <h1 className="main-menu-title">PorHorror</h1>

            <div className="section-container"> 
                <div className="section equipment">
                    <div className="section-title">Снаряжение</div>
                    <div className="equipment-slot"></div>
                    <div className="equipment-slot"></div>
                    <div className="equipment-slot"></div>
                </div>
                <div className="section inventory">
                    <div className="section-title">Инвентарь</div>
                    <Inventory />
                </div>
                <div className="section users">
                    <div className="section-title">Пользователи</div>
                </div>
                <div className="section lobby">
                    <div className="section-title">Лобби</div>
                    <button className="create-lobby-button button">Создать лобби</button>
                </div>
                
    
            </div> 
            <div className="settings">
    <button className="button" onClick={settingsClickHandler}>Настройки</button> 
                

            <div className="exit">
                <button className="button" onClick={backClickHandler}>Выход</button>
            </div>
        </div>
        </div>
        </div>
    );
};

    
export default MainMenu;