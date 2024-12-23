const useLoop = (): [(loop: () => void) => void, () => void] => {
    let idLoop: number;
    
    const startLoop = (loop: () => void) => {
        loop();
        idLoop = window.requestAnimationFrame(() => startLoop(loop));
    }
    const stopLoop = () => window.cancelAnimationFrame(idLoop);

    return [startLoop, stopLoop];
}

export default useLoop;