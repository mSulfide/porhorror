import { useContext, useEffect } from "react";
import { Button, Inventory, Lobby, LobbyWin } from "../../components";
import { IBasePage, PAGES } from "../PageManager";
import { ServerContext, StoreContext } from "../../App";

const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);

    const backClickHandler = () => {
        (async () => await server.logout() && setPage(PAGES.LOGIN))();
    }

    return <div>
        <Inventory />
        <LobbyWin />
        <Button onClick={backClickHandler} text="Выход" />
    </div>;
}

export default MainMenu;