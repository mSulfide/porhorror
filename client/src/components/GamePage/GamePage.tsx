import { useEffect, useRef } from "react";
import Game from "../../services/Game/Game";
import { CanvasDrawer, MainScreen } from "../../services/drawer";
import { testScene } from "../../services/engine/structures/Scene/scenes";

const GamePage: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

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
        <canvas ref={canvasRef} width={800} height={600}/>
    </div>;
}

export default GamePage;