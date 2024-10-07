import { useEffect, useRef } from "react";
import MainScreen from "../../services/engine/structures/MainScreen";
import CanvasDrawer from "../../services/engine/structures/CanvasDrawer";
import Game from "../../services/Game/Game";

const GamePage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const game = new Game({});

    useEffect(() => {
        const screen = new MainScreen(new CanvasDrawer(canvasRef.current!));

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
        <canvas ref={canvasRef}/>
    </div>;
}

export default GamePage;