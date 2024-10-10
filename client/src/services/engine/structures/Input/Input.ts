class Input {
    // Флаги для отслеживания состояния каждой клавиши
    private isWPressed: boolean = false; // Для движения вверх W
    private isAPressed: boolean = false; // Для движения влево A
    private isSPressed: boolean = false; // Для движения вниз S
    private isDPressed: boolean = false; // Для движения вправо D
    private isSpacePressed: boolean = false; // Для кнопки действия пробел

    // Флаги для отслеживания нажатия/отпускания кнопок В ТЕКУЩЕМ КАДРЕ
    private isWPressedDown: boolean = false;
    private isAPressedDown: boolean = false;
    private isSPressedDown: boolean = false;
    private isDPressedDown: boolean = false;
    private isSpacePressedDown: boolean = false;

    private isWPressedUp: boolean = false;
    private isAPressedUp: boolean = false;
    private isSPressedUp: boolean = false;
    private isDPressedUp: boolean = false;
    private isSpacePressedUp: boolean = false;

    // Виртуальные оси
    private axisX: number = 0;
    private axisY: number = 0;

    // Методы для имитации нажатия/отпускания клавиш
    public getActiveButton(button: string, value: boolean): void {
        switch (button) {
            case 'w':
                this.isWPressed = value;
                this.isWPressedDown = value && !this.isWPressedUp;
                this.isWPressedUp = !value && this.isWPressed;
                break;
            case 'a':
                this.isAPressed = value;
                this.isAPressedDown = value && !this.isAPressedUp;
                this.isAPressedUp = !value && this.isAPressed;
                break;
            case 's':
                this.isSPressed = value;
                this.isSPressedDown = value && !this.isSPressedUp;
                this.isSPressedUp = !value && this.isSPressed;
                break;
            case 'd':
                this.isDPressed = value;
                this.isDPressedDown = value && !this.isDPressedUp;
                this.isDPressedUp = !value && this.isDPressed;
                break;
            case ' ':
                this.isSpacePressed = value;
                this.isSpacePressedDown = value && !this.isSpacePressedUp;
                this.isSpacePressedUp = !value && this.isSpacePressed;
                break;
        }
    }

    // Методы для получения состояния кнопок и осей
    public getAxisX(): number {
        return this.axisX;
    }

    public setAxisX(value: number): void {
        this.axisX = value;
    }

    public getAxisY(): number {
        return this.axisY;
    }

    public setAxisY(value: number): void {
        this.axisY = value;
    }

    // Получение состояния кнопок
    public isPressed(button: string): boolean {
        switch (button) {
            case 'w': return this.isWPressed;
            case 'a': return this.isAPressed;
            case 's': return this.isSPressed;
            case 'd': return this.isDPressed;
            case ' ': return this.isSpacePressed;
            default: return false;
        }
    }

    public isPressedDown(button: string): boolean {
        switch (button) {
            case 'w': return this.isWPressedDown;
            case 'a': return this.isAPressedDown;
            case 's': return this.isSPressedDown;
            case 'd': return this.isDPressedDown;
            case ' ': return this.isSpacePressedDown;
            default: return false;
        }
    }

    public isPressedUp(button: string): boolean {
        switch (button) {
            case 'w': return this.isWPressedUp;
            case 'a': return this.isAPressedUp;
            case 's': return this.isSPressedUp;
            case 'd': return this.isDPressedUp;
            case ' ': return this.isSpacePressedUp;
            default: return false;
        }
    }

    // Обновление флагов для нажатия/отпускания кнопок В ТЕКУЩЕМ КАДРЕ
    public update(): void {
        // Сброс флагов для нажатия/отпускания кнопок в НОВОМ кадре
        this.isWPressedDown = false;
        this.isAPressedDown = false;
        this.isSPressedDown = false;
        this.isDPressedDown = false;
        this.isSpacePressedDown = false;

        this.isWPressedUp = false;
        this.isAPressedUp = false;
        this.isSPressedUp = false;
        this.isDPressedUp = false;
        this.isSpacePressedUp = false;
    }
}

export default Input;