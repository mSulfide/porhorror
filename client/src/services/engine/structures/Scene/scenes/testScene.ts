import { Player } from "../../../entity";
import { CircleCollider } from "../../Physic";
import Scene from "../Scene";

const player: Player = new Player();
const playerCollider = new CircleCollider(0.1, player.position);
const randomCollider = new CircleCollider(1, { x: 0, y: 1.4 });

const testScene: Scene = new Scene({
    updatable: [
        player
    ],
    dynamicColliders: [
        playerCollider
    ],
    staticColliders: [
        randomCollider
    ]
});

export default testScene;