import { useEffect, useRef } from 'react'; //добавлен useRef
import Scene from './structures/Scene';
import MainScreen from './structures/MainScreen';
import Player from './entities/objects/Player';
import KeyboardInput from './structures/KeyboardInput';
import IInput from './interfaces/IInput';
import CanvasDrawer from './structures/CanvasDrawer'; //добавлено

const Game: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null); //добвлено

  const input: IInput = new KeyboardInput();
  const scene: Scene = new Scene([new Player(input)]);

  const update = (deltaTime: number) => {
    scene.forEach((gameObject) => {
      gameObject.update(deltaTime);
    });
  };

  useEffect(() => {
    let idLoop: number;

    let dTimestamp = Date.now();
    let deltaTime = 0;

    const canvas = canvasRef.current!; //добавлено
    const drawer = new CanvasDrawer(canvas); //добавлено 
    const screen = new MainScreen(drawer); //изменено

    const loop = () => {
      const currentTimestamp = Date.now();

      deltaTime = (currentTimestamp - dTimestamp) / 1000;
      dTimestamp = currentTimestamp;

      update(deltaTime);

      screen.render(scene);

      idLoop = window.requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.cancelAnimationFrame(idLoop);
    };
  }, []); //изменено

  return (
    <>
      <canvas ref={canvasRef} width={32} height={18} /> 
    </> //добавлено
  );
};

export default Game;


/*import { useEffect } from "react";
import Scene from "./structures/Scene";
import ConsoleDrawer from "./structures/ConsoleDrawer";
import MainScreen from "./structures/MainScreen";
import Player from "./entities/objects/Player";
import KeyboardInput from "./structures/KeyboardInput";
import IInput from "./interfaces/IInput";

const Game: React.FC = () => {
    const input: IInput = new KeyboardInput;
    const scene: Scene = new Scene([new Player(input)]);

    const update = (deltaTime: number) => {
        scene.forEach(gameObject => {
            gameObject.update(deltaTime);
        });
    };

    useEffect(() => {
        let idLoop: number;

        let dTimestamp = Date.now();
        let deltaTime = 0;

        const screen: MainScreen = new MainScreen(new ConsoleDrawer());

        const loop = () => {
            const currentTimestamp = Date.now();

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

export default Game;*/