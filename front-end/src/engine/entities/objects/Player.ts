import IInput from "../../interfaces/IInput";
import GameObject from "../../structures/GameObject";
import { TDrawRequest, TPoint } from "../../types";

export default class Player extends GameObject {
    private _input: IInput;

    constructor(input: IInput, position?: TPoint) {
        super(position);
        this._input = input;
    }

    public update(deltaTime: number): void {
        this.position.x += this._input.getAxisX() * deltaTime;
        this.position.y += this._input.getAxisY() * deltaTime;
    }

    public render(addDrawRequest: (drawRequest: TDrawRequest) => void): void {
        addDrawRequest({ position: this.position, radius: 1 });
    }
}