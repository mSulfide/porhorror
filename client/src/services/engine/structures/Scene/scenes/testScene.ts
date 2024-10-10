import { Player } from "../../../entity";
import Scene from "../Scene";
import PhysicalBehaviour from "../../../physic/PhysicalBehavouor";

const testScene: Scene = new Scene([
    new Player,
    new PhysicalBehaviour({x: -0.6, y: -0.6}, 1)
]);

export default testScene;