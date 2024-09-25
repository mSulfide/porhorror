import { useEffect } from "react";
import Scene from "./structures/Scene";
import ConsoleDrawer from "./structures/ConsoleDrawer";
import MainScreen from "./structures/MainScreen";
import Player from "./entities/objects/Player";
import KeyboardInput from "./structures/KeyboardInput";

const Game: React.FC = () => {
    const scene: Scene = new Scene([new Player(new KeyboardInput)]);

    const update = (deltaTime: number) => {
        scene.forEach(gameObject => {
            gameObject.update(deltaTime);
        });
    };

    useEffect(() => {
        let currentFPS = 0;
        let FPS = 0;
        let timestamp = Date.now();
        let idLoop: number;

        let dTimestamp = Date.now();
        let deltaTime = 0;

        const screen: MainScreen = new MainScreen(new ConsoleDrawer());

        const loop = () => {
            FPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                timestamp = currentTimestamp;
                currentFPS = FPS;
                FPS = 0;
            }

            deltaTime = (currentTimestamp - dTimestamp) / 1000;
            dTimestamp = currentTimestamp;

            update(deltaTime);

            screen.render(scene);

            idLoop = window.requestAnimationFrame(loop);
        }

        loop();

        return () => {
            window.cancelAnimationFrame(idLoop);
        }
    });

    return <></>;
};

export default Game;