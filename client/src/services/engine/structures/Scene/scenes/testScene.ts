import { FuncCollider, Player } from "../../../entity";
import Scene from "../Scene";

const player: Player = new Player(0.025);
const randomCollider = new FuncCollider((x: number) => x * x * x, { x: 0, y: 0.9 });

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
    ]
});

export default testScene;