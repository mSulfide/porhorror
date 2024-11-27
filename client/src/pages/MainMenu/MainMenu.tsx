import { useContext } from "react";
import { Button, Inventory, Lobby } from "../../components";
import { IBasePage, PAGES } from "../PageManager";
import { ServerContext } from "../../App";
import LobbyList from "../../components/LobbyList/LobbyList";

const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);

    const backClickHandler = () => {
        (async () => {
            if (await server.logout())
                setPage(PAGES.LOGIN);
        })();
    }
    
    return <div>
        <Inventory />
        <Lobby />
        <LobbyList />
        <Button onClick={backClickHandler} text="Выход" />
    </div>;
}

export default MainMenu;