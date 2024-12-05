import { useContext } from "react";
import { Button, Lobby } from "../../components";
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

    return <>
        <Lobby />
        <Button onClick={settingsClickHandler} text="Настройки" />
        <Button onClick={backClickHandler} text="Выход" />
    </>;
}

export default MainMenu;