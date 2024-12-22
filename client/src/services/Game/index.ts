import { Scene } from "../engine/structures";
import Input from "../input/Input";

export type TGameOptions = {
    scene?: Scene;
    input?: Input;

}

export type TGameState = {
    scene: Scene
}