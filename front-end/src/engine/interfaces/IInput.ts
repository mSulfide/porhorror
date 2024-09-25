import { TPoint } from "../types";

export default interface IInput {
    cursorPosition: TPoint; //The current cursor position in pixel coordinates

    getAxisX(): number; //Returns the value of the virtual X axis ∈ [-1; 1]

    getAxisY(): number; //Returns the value of the virtual Y axis ∈ [-1; 1]

    getActionButton(): boolean; //Returns true while the user holds down the button
}