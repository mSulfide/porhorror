import { useContext, useEffect, useRef, useState } from "react";
import { ServerContext, StoreContext } from "../../App";
import { IBasePage, PAGES } from "../PageManager";
import { Button } from "../../components";
import { TGameObject, TUpdateSceneResponse, TUpdateInventoryResponse, TItem, EItemStatus } from "../../services/server/types";
import { CanvasDrawer, Renderer } from "../../game/drawer";
import { Input, useKeyboard } from "../../game/input";
import { Scene } from "../../game/scene";
import { zero } from "../../services/math";
import useLoop from "./hooks/useLoop";
import { useMap } from "./hooks/useMap";
import Timer from "../../components/Timer/Timer";
import Item from "../../components/Item/Item";
import './PHGame.scss';

const PHGame: React.FC<IBasePage> = (props: IBasePage) => {
    const server = useContext(ServerContext);
    const store = useContext(StoreContext);
    const user = store.getUser();

    const pocketItems = store.getInventory().filter(item => item.status === EItemStatus.pocket);
    console.log(pocketItems)


    const backClickHandler = () => props.setPage(PAGES.MAIN_MENU);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onAxisChange = (axisX: number, axisY: number) => server.move(axisX, axisY);
    const onButtonChange = (state: boolean) => state && server.action();
    const input = new Input({ onAxisChange, onButtonChange });
    const [startLoop, stopLoop] = useLoop();

    useKeyboard(input);

    const [renderers, count] = useMap();

    useEffect(() => {
        const camera = { width: 8.32, height: 6.24 };
        const screen = new Renderer(new CanvasDrawer(canvasRef.current!), camera);
        const virtualScene = new Scene();

        const update = (deltaTime: number) => {
            virtualScene.update(deltaTime);
            screen.render(renderers)
        }

        startLoop(update);

        const updateScene = ({ scene }: TUpdateSceneResponse) => {
            renderers.splice(count, renderers.length - count);
            scene.forEach(({ position, radius, image, angle }: TGameObject) => {
                const sprite = store.resources.getSprite(image);
                if (sprite) {
                    renderers.push({ position, radius, sprite, angle: angle * 180 / Math.PI });
                } else {
                    console.warn("can't upload the image");
                }
            });
            virtualScene.set(scene);
            screen.camera.position = renderers[count]?.position || zero();
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
        <div className="wrapper3">
            <div className="game-container">
                <div className="game">
                    <div className="game-heading">Game</div>
                    <div className="timer"> <Timer time={300}/></div>
                    <div className="canvas-container"><canvas ref={canvasRef} width={800} height={600} /></div>
                    </div>
                    <div className="controls">
                        {/* <div className="progress-bar-container">
                            <div className="progress-heading">progress bar</div>
                        </div> */}
                        <div className="equipment-section">
                    {[...pocketItems, ...Array(3 - pocketItems.length).fill(null)].map((item, index) => (
                        item ? (
                            <div key={item.id} className="slot filled">
                                <Item item={item}/>
                            </div>
                        ) : (
                            <div key={`empty-${index}`} className="slot empty"></div>
                        )
                    ))}
                </div>
                            <div className="tasks-container">
                                <div className="task-heading">tasks</div>
                                </div>
                                </div>
                                </div>
                                </div>
                                );
                            }

export default PHGame;