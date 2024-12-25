import { useContext } from "react";
import { ServerContext } from "../../../App";
import CONFIG from "../../../config";

const useLoop = (): [(loop: (deltaTime: number) => void) => void, () => void] => {
    let idLoop: number;
    let time = Date.now();
    const server = useContext(ServerContext)
    const { GAME_TIMESTAMP } = CONFIG;
    
    const startLoop = (loop: (deltaTime: number) => void) => {
        const dTime = Date.now();
        loop((dTime - time) / 1000);
        time = dTime;
        idLoop = window.requestAnimationFrame(() => startLoop(loop));
    }
    const stopLoop = () => window.cancelAnimationFrame(idLoop);

    return [startLoop, stopLoop];
}

export default useLoop;