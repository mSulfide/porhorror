import { useEffect, useState } from "react";
import { GameObject } from "./structures";
import Player from "./entities/Player";
import IDrawer from "./structures/IDrawer";
import MegaDrawer from "./entities/MegaDrawer";
import ThreeDrawer from "./entities/ThreeDrawer"


const Game: React.FC = () => {
    const gameObjects: GameObject[] = [ new Player("player01") ];
    const drawer: IDrawer | null = new ThreeDrawer();

    const update = (deltaTime: number) => {
        gameObjects.forEach(gameObject => {
            gameObject.update(deltaTime);
        });
    }

    const render = () => {
        if (drawer) {
            gameObjects.forEach(gameObject => {
                gameObject.draw(drawer);
            });
        }
    }

    useEffect(() => {
        let currentFPS = 0;
        let FPS = 0;
        let timestamp = Date.now();
        let idLoop: number;

        let dTimestamp = Date.now();
        let deltaTime = 0;

        const loop = () => {
            FPS++;
            const currentTimestamp = Date.now();
            if (currentTimestamp - timestamp >= 1000) {
                timestamp = currentTimestamp;
                currentFPS = FPS;
                //setFPS(currentFPS);
                FPS = 0;
            }

            deltaTime = (currentTimestamp - dTimestamp) / 1000;
            dTimestamp = currentTimestamp;

            update(deltaTime);
            render();

            idLoop = window.requestAnimationFrame(loop);
        }

        loop();

        return () => {
            window.cancelAnimationFrame(idLoop);
        }
    });
    
    return(<></>);
}

export default Game;