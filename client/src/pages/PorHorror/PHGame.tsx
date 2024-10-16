import { useEffect, useRef } from "react";
import Game from "../../services/Game/Game";
import { CanvasDrawer, MainScreen } from "../../services/drawer";
import { testScene } from "../../services/engine/structures/Scene/scenes";
import { IBasePage, PAGES } from "../PageManager";
import Button from "../../components/Button/Button";
import useKeyboard from "./hooks/useKeyboard";
import Input from "../../services/engine/structures/Input/Input";
import UserPoints from "../../components/UserPoints/UserPoints";

const PHGame: React.FC<IBasePage> = (props: IBasePage) => {
    const backClickHandler = () => props.setPage(PAGES.CHAT);

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const input = new Input();

    useKeyboard(input);

    useEffect(() => {
        const game = new Game({ scene: testScene, input: input });
        const screen = new MainScreen(new CanvasDrawer(canvasRef.current!), game.getState().scene);

        let idLoop: number;
        const loop = () => {
            game.update();

            screen.render();

            idLoop = window.requestAnimationFrame(loop);
        }
        loop();

        return () => {
            window.cancelAnimationFrame(idLoop);
        };
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