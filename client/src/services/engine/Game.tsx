import { useEffect, useRef } from 'react'; 
import Scene from './structures/Scene/Scene';
import MainScreen from './structures/MainScreen';
import Player from './entities/objects/Player';
import KeyboardInput from './structures/KeyboardInput';
import IInput from './interfaces/IInput';
import CanvasDrawer from './structures/CanvasDrawer'; 

const Game: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null); 

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

    const canvas = canvasRef.current!; 
    const drawer = new CanvasDrawer(canvas); 
    const screen = new MainScreen(drawer); 

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
  }, []); 

  return (
    <>
      <canvas ref={canvasRef} width={400} height={300} /> 
    </>
  );
};

export default Game;

