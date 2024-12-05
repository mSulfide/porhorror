import { useContext } from "react";
import { Button } from "../../components";
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
        <Button onClick={settingsClickHandler} text="Настройки" />
        <Button onClick={backClickHandler} text="Выход" />
    </>;
}

export default MainMenu;