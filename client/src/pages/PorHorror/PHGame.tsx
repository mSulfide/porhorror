import { useContext, useEffect, useRef } from "react";
import { CanvasDrawer, MainScreen } from "../../services/drawer";
import { IBasePage, PAGES } from "../PageManager";
import { Button } from "../../components";
import { ServerContext, StoreContext } from "../../App";
import { TGameObject, TUpdateSceneResponse } from "../../services/server/types";
import { Input, useKeyboard } from "../../services/input";
import { IRenderer } from "../../services/drawer/MainScreen/IRenderer";
import useLoop from "./hooks/useLoop";
import Scene from "../../services/scene/Scene";

const PHGame: React.FC<IBasePage> = (props: IBasePage) => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();

    const backClickHandler = () => props.setPage(PAGES.MAIN_MENU);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onAxisChange = (axisX: number, axisY: number) => server.move(axisX, axisY);
    const onButtonChange = (state: boolean) => state && server.action();
    const input = new Input({ onAxisChange, onButtonChange });
    const [startLoop, stopLoop] = useLoop();

    useKeyboard(input);

    useEffect(() => {
        const camera = { width: 8.32, height: 6.24 };
        const screen = new MainScreen(new CanvasDrawer(canvasRef.current!), camera);
        const renderers: IRenderer[] = [];
        const virtualScene = new Scene();

        const update = (deltaTime: number) => {
            virtualScene.update(deltaTime);
            screen.render(renderers)
        }

        startLoop(update);

        const updateScene = ({ scene }: TUpdateSceneResponse) => {
            renderers.splice(0, renderers.length);
            scene.forEach(({ position, radius, image }: TGameObject) => {
                const sprite = store.resources.getImage(image);
                if (sprite) {
                    renderers.push({ position, radius, sprite });
                } else {
                    console.warn("can't upload the image");
                }
            });
            virtualScene.set(scene);
            screen.render(renderers);
        }

        if (user) {
            server.startSceneUpdate(updateScene);
        }

        return () => {
            server.stopSceneUpdate();
            stopLoop();
        }
    });

    return (
        <div>
            <canvas ref={canvasRef} width={600} height={450} />
            <Button onClick={backClickHandler} text='Назад' />
        </div>
    );
}

export default PHGame;