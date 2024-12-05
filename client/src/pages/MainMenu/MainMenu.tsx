import { useContext } from "react";
import { Button, Inventory, Lobby } from "../../components";
import { IBasePage, PAGES } from "../PageManager";
import { ServerContext } from "../../App";

const MainMenu: React.FC<IBasePage> = (props: IBasePage) => {
    const { setPage } = props;
    const server = useContext(ServerContext);

    const settingsClickHandler = () => {

    }
    const backClickHandler = async () => {
        await server.logout() && setPage(PAGES.LOGIN);
    }

    return <div>
        <Inventory />
        <Lobby />
        <Button onClick={settingsClickHandler} text="Настройки" />
        <Button onClick={backClickHandler} text="Выход" />
    </div>;
}

export default MainMenu;