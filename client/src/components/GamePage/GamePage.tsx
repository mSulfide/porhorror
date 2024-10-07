import { useEffect, useRef } from "react";
import Game from "../../services/Game/Game";
import { CanvasDrawer, MainScreen } from "../../services/drawer";

const GamePage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const game = new Game({});
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