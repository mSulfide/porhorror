import { Player } from "../../../entity";
import { CircleCollider } from "../../Physic";
import Scene from "../Scene";
import Obstacle from "../../../entity/Obstacle/Obstacle";

const player: Player = new Player(0.025);
const randomCollider = new Obstacle((x: number) => x * x * x, { x: 0, y: 0.9 });

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