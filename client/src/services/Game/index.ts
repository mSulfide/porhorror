import { Scene } from "../engine/structures";
import Input from "../engine/structures/Input/Input";

export type TGameOptions = {
    scene?: Scene;
    input?: Input;

}

export type TGameState = {
    scene: Scene
}