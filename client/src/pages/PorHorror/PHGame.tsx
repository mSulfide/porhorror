import { useContext, useEffect, useRef } from "react";
import { CanvasDrawer, MainScreen } from "../../services/drawer";
import { IBasePage, PAGES } from "../PageManager";
import { Button } from "../../components";
import { ServerContext, StoreContext } from "../../App";
import { TUpdateSceneResponse } from "../../services/server/types";
import { Input, useKeyboard } from "../../services/input";

const PHGame: React.FC<IBasePage> = (props: IBasePage) => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();

    const backClickHandler = () => props.setPage(PAGES.MAIN_MENU);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onAxisChange = (axisX: number, axisY: number) => server.move(axisX, axisY);
    const onButtonChange = (state: boolean) => state && server.action();
    const input = new Input({ onAxisChange, onButtonChange });

    useKeyboard(input);

    useEffect(() => {
        const camera = { width: 8.32, height: 6.24 };
        const screen = new MainScreen(new CanvasDrawer(canvasRef.current!), camera);

        const updateScene = ({ scene }: TUpdateSceneResponse) => {
            screen.render(scene);
        }

        if (user) {
            server.startSceneUpdate(updateScene);
        }

        return () => server.stopSceneUpdate();
    });

    return (
        <div>
            <canvas ref={canvasRef} width={600} height={450} />
            <Button onClick={backClickHandler} text='Назад' />
        </div>
    );
}

export default PHGame;