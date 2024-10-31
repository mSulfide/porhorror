import { FuncCollider, Player } from "../../../entity";
import Scene from "../Scene";

const player: Player = new Player(0.25);
const randomCollider = new FuncCollider((x: number) => x / 2 + Math.sin(x), { x: 0, y: 0 });

const testScene: Scene = new Scene({
    updatable: [
        player,
        randomCollider
    ],
    dynamicColliders: [
        player
    ],
    staticColliders: [
        randomCollider
    ],
    renderers: [
        player,
        randomCollider
    ]
});

export default testScene;