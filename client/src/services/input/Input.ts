export type TButtonEvent = (state: boolean) => void;

export type TAxisEvent = (axisX: number, axisY: number) => void;

export interface IInputCallbacks {
    onButtonChange: TButtonEvent;
    onAxisChange: TAxisEvent;
}

class Input {
    // Флаг для отслеживания состояния кнопки
    private buttonState: boolean = false;

    // Виртуальные оси
    private axisX: number = 0;
    private axisY: number = 0;

    private onButtonChange: () => void;
    private onAxisChange: () => void;

    constructor({ onButtonChange, onAxisChange }: IInputCallbacks) {
        this.onButtonChange = () => onButtonChange(this.buttonState);
        this.onAxisChange = () => onAxisChange(this.axisX, this.axisY);
    }

    public setActiveButton(value: boolean): void {
        if (this.buttonState !== value) {
            this.buttonState = value;
            this.onButtonChange();
        }
    }

    public setAxisX(value: number): void {
        const eps = 0.1;
        if (Math.abs(this.axisX - value) > eps) {
            // Ограничение значения в диапазоне [-1, 1]
            this.axisX = Math.max(-1, Math.min(1, value));
            this.onAxisChange();
        }
    }

    public setAxisY(value: number): void {
        const eps = 0.1;
        if (Math.abs(this.axisY - value) > eps) {
            // Ограничение значения в диапазоне [-1, 1]
            this.axisY = Math.max(-1, Math.min(1, value));
            this.onAxisChange();
        }
    }
}

export default Input;