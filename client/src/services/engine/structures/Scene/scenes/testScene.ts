import { Player } from "../../../entity";
import { CircleCollider } from "../../Physic";
import Scene from "../Scene";
import Obstacle from "../../../entity/Obstacle/Obstacle";

const player: Player = new Player(0.1);
const randomCollider = new CircleCollider(1, { x: 0, y: 1.4 });

const testScene: Scene = new Scene({
    updatable: [
        player
    ],
    dynamicColliders: [
        player
    ],
    staticColliders: [
        randomCollider
    ]
});

export default testScene;