import { useEffect, useRef } from 'react'; 
import Scene from './structures/Scene/Scene';
import Player from './entities/objects/Player';
import KeyboardInput from './structures/KeyboardInput';
import IInput from './interfaces/IInput';
import CanvasDrawer from './structures/CanvasDrawer'; 

const Game: React.FC = () => {

  const canvasRef = useRef<HTMLCanvasElement>(null); 

  const input: IInput = new KeyboardInput();

  const update = (deltaTime: number) => {
    
  };

  useEffect(() => {
    let idLoop: number;

    let dTimestamp = Date.now();
    let deltaTime = 0;

    const canvas = canvasRef.current!; 
    const drawer = new CanvasDrawer(canvas); 

    const loop = () => {
      const currentTimestamp = Date.now();

      deltaTime = (currentTimestamp - dTimestamp) / 1000;
      dTimestamp = currentTimestamp;

      update(deltaTime);

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

