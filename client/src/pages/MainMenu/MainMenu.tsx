import { useContext } from "react";
import { Button, Chat, Inventory, Lobby } from "../../components";
import { IBasePage, PAGES } from "../PageManager";
import { ServerContext, StoreContext } from "../../App";

const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    store.setChatHash('empty');
    store.setLobbyHash('empty');

    const settingsClickHandler = () => {

    }
    const backClickHandler = async () => {
        await server.logout() && setPage(PAGES.LOGIN);
    }
    const startGameHandler = () => {
        server.startGame();
        setPage(PAGES.PORHORROR);
    }

    return <div>
        <Inventory />
        <Lobby startGameHandler={startGameHandler} />
        <Chat />
        <Button onClick={settingsClickHandler} text="Настройки" />
        <Button onClick={backClickHandler} text="Выход" />
    </div>;
}

export default MainMenu;