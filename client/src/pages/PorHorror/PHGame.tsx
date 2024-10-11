import { useEffect, useRef } from "react";
import Game from "../../services/Game/Game";
import { CanvasDrawer, MainScreen } from "../../services/drawer";
import { testScene } from "../../services/engine/structures/Scene/scenes";
import { IBasePage, PAGES } from "../PageManager";
import Button from "../../components/Button/Button";
import useKeyboard from "./hooks/useKeyboard";
import Input from "../../services/engine/structures/Input/Input";

const PHGame: React.FC<IBasePage> = (props: IBasePage) => {
    const backClickHandler = () => props.setPage(PAGES.CHAT);

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const input = new Input(); 

    useKeyboard(input, canvasRef);

    useEffect(() => {
        const game = new Game({ scene: testScene });
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

    return <div>
        <canvas ref={canvasRef} width={600} height={450}/>
        <Button onClick={backClickHandler} text='Назад' />
    </div>;
}

export default PHGame;