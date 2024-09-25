import IInput from "../interfaces/IInput";
import { TPoint } from "../types";

export default class KeyboardInput implements IInput {
    cursorPosition: TPoint = { x: 0, y: 0 };

    getAxisX(): number {
        return 0;
    }

    getAxisY(): number {
        return 1;
    }

    getActionButton(): boolean {
        throw new Error("Method not implemented.");
    }
}