class Input {
    // Флаг для отслеживания состояния кнопки
    private isButtonActive: boolean = false;

    // Флаги для отслеживания событий нажатия и отпускания кнопки
    private isButtonDown: boolean = false;
    private isButtonUp: boolean = false;

    // Виртуальные оси
    private axisX: number = 0;
    private axisY: number = 0;

    // Методы
    public getActiveButton(): boolean {
        return this.isButtonActive;
    }

    public getActiveButtonDown(): boolean {
        return this.isButtonDown;
    }

    public getActiveButtonUp(): boolean {
        return this.isButtonUp;
    }

    public setActiveButton(value: boolean): void {
        this.isButtonDown = value && !this.isButtonActive;
        this.isButtonUp = !value && this.isButtonActive;
        this.isButtonActive = value;
    }

    public getAxisX(): number {
        return this.axisX;
    }

    public setAxisX(value: number): void {
        // Ограничение значения в диапазоне [-1, 1]
        this.axisX = Math.max(-1, Math.min(1, value));
    }

    public getAxisY(): number {
        return this.axisY;
    }

    public setAxisY(value: number): void {
        // Ограничение значения в диапазоне [-1, 1]
        this.axisY = Math.max(-1, Math.min(1, value));
    }

    // Обновление флагов событий нажатия/отпускания кнопки перед каждым кадром
    public update() {
        this.isButtonDown = false;
        this.isButtonUp = false;
    }
}

export default Input;