import { useContext } from "react";
import Button from "../Button/Button"
import { ServerContext } from "../../App";

const StartGameButton: React.FC = () => {
    const server = useContext(ServerContext);
    const handler = () => {
        server.startGame();
    };
    return <>
        <Button onClick={handler} text="Запустить" />
    </>
}

export default StartGameButton;