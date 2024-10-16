import { Player } from "../../../entity";
import Scene from "../Scene";
import Obstacle from "../../../entity/Obstacle/Obstacle";

const testScene: Scene = new Scene([
    new Player, 
    new Obstacle(x => x * x * x)
]);

export default testScene;