import { useContext, useEffect } from "react";
import { Button, Inventory, Lobby } from "../../components";
import { IBasePage, PAGES } from "../PageManager";
import { ServerContext, StoreContext } from "../../App";
import LobbyList from "../../components/LobbyList/LobbyList";
import { TLobby } from "../../services/server/types";

const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const lobby = store.getLobby();

    const backClickHandler = () => {
        (async () => await server.logout() && setPage(PAGES.LOGIN))();
    }

    return <div>
        <Inventory />
        {lobby ? <Lobby lobby={lobby}/> : <LobbyList />}
        <Button onClick={backClickHandler} text="Выход" />
    </div>;
}

export default MainMenu;