import React, { useContext } from 'react';
import { Button, Inventory, Lobby,} from '../../components';
import { IBasePage, PAGES } from '../PageManager';
import { ServerContext, StoreContext } from '../../App';
import './MainMenu.scss';
import Chat from '../Chat/Chat';
import { KeyObject } from 'crypto';


const MainMenu: React.FC<IBasePage> = ({ setPage }) => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    store.setChatHash('empty');
    store.setLobbyHash('empty');

    const settingsClickHandler = () => {
        // Add settings functionality here
    };

    const backClickHandler = async () => {
        await server.logout() && setPage(PAGES.LOGIN);
    };

    const chatClickHandler = () => setPage(PAGES.CHAT);
    const setGamePage = () => {
        setPage(PAGES.PORHORROR);
    };
   

    return (
        <div className="wrapper-menu">
        <div className="mainMenuContainer">
            <div className="column-1">
            <h1 className="main-menu-title">PorHorror</h1>
                <div className="section equipment">
                    <div className="section-title">Equipment</div>   
                    <div className="combined-equipment-inventory">
                        <div className="equipment-section">
      <div></div>
      <div></div>
      <div></div>
    </div> 
                    
            
                    <div className="inventory">
                    <div className="section-title">Inventory</div>
                    <Inventory />
                </div>
                </div></div>
                
                <div className="section chat">
                    <Chat setPage={setPage} />
        
                </div>
                <div className="exit">
                    <button className="button" onClick={backClickHandler}>Выход</button>
                </div>
            </div>

            <div className="column-2">
            <div className="settings">
                    <button className="button" onClick={settingsClickHandler}>Настройки</button>
                </div>
                <div className="section user">
                    <div className="section-title">User</div>
                </div>
                
                <div className="section lobby">
                    <div className="section-title">Lobby</div>
                    <Lobby setGamePage={setGamePage}/>
                    <div className="lobby-inputs"> {/* Added container for inputs */}
                    
                </div>
            </div>
        </div>
    </div>
    </div>
    );
};

export default MainMenu;
