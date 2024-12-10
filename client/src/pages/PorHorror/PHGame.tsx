import { useContext, useEffect, useRef } from "react";
import Game from "../../services/Game/Game";
import { CanvasDrawer, MainScreen } from "../../services/drawer";
import { testScene } from "../../services/engine/structures/Scene/scenes";
import { IBasePage, PAGES } from "../PageManager";
import useKeyboard from "./hooks/useKeyboard";
import { Input } from "../../services/engine/structures";
import { Button, UserPoints } from "../../components";
import { ServerContext } from "../../App";

const PHGame: React.FC<IBasePage> = (props: IBasePage) => {
    const server = useContext(ServerContext);

    const backClickHandler = () => props.setPage(PAGES.MAIN_MENU);

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const input = new Input();

    useKeyboard(input);

    useEffect(() => {
        const game = new Game({ scene: testScene, input: input });
        const camera = { width: 8.32, height: 6.24 };
        const screen = new MainScreen(new CanvasDrawer(canvasRef.current!), camera);

        (async () => {
            console.log(await server.updateScene());
        })();
    });

    const handlePointsSubmit = (points: { x: number; y: number }[]) => {
        console.log('Введенные точки:', points);
    };

    return (
        <div>
            <canvas ref={canvasRef} width={600} height={450} />
            <h6>Введите координаты точки: (x,y)</h6>
            <UserPoints onPointsSubmit={handlePointsSubmit} />
            <Button onClick={backClickHandler} text='Назад' />
        </div>
    );
}

export default PHGame;