class Input {

    // Поля
    public cursorPosition: { x: 0, y: 0 }; // Начальная позиция курсора

    // Флаги для отслеживания состояния каждой клавиши
    private _isWPressed: boolean = false; // Для движения вверх W
    private _isAPressed: boolean = false; // Для движения влево A
    private _isSPressed: boolean = false; // Для движения вниз S
    private _isDPressed: boolean = false; // Для движения вправо D
    private _isSpacePressed: boolean = false; // Для кнопки действия пробел

    // Конструктор класса
    public constructor() {
        this.cursorPosition = { x: 0, y: 0 };
        // Привязываем обработчики событий клавиатуры
        window.addEventListener('keydown', this.handleKey.bind(this, true));
        window.addEventListener('keyup', this.handleKey.bind(this, false));
    }

    // Методы
    public getAxisX(): number {
        return Number(this._isDPressed) - Number(this._isAPressed);
    }

    public getAxisY(): number {
        return Number(this._isWPressed) - Number(this._isSPressed);
    }

    public getActionButton(): boolean {
        return this._isSpacePressed;
    }

    private handleKey(pressed: boolean, event: KeyboardEvent): void {
        switch (event.key) {
            case 'w':
                this._isWPressed = pressed;
                break;
            case 'a':
                this._isAPressed = pressed;
                break;
            case 's':
                this._isSPressed = pressed;
                break;
            case 'd':
                this._isDPressed = pressed;
                break;
            case ' ':
                this._isSpacePressed = pressed;
                break;
        }
    }
}

export default Input;