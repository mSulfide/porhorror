import { Player } from "../../../entity";
import Scene from "../Scene";

const player: Player = new Player();

const testScene: Scene = new Scene({
    updatable: [
        player
    ]
});

export default testScene;