import IInput from "../interfaces/IInput";
import { TPoint } from "../types";

export default class KeyboardInput implements IInput {
    cursorPosition: TPoint = { x: 0, y: 0}; // Начальная позиция курсора

    // Флаги для отслеживания состояния каждой клавиши
    private isWPressed: boolean = false; // Для движения вверх W
    private isAPressed: boolean = false; // Для движения влево A
    private isSPressed: boolean = false; // Для движения вниз S
    private isDPressed: boolean = false; // Для движения вправо D
    private isSpacePressed: boolean = false; // Для кнопки действия пробел
    constructor() {
        // Привязываем обработчики событий клавиатуры
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    private handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case 'w':
                this.isWPressed = true; 
                break;
            case 'a':
                this.isAPressed = true; 
                break;
            case 's':
                this.isSPressed = true; 
                break;
            case 'd':
                this.isDPressed = true; 
                break;
            case ' ':
                this.isSpacePressed = true; 
                break;
        }
    }

    private handleKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case 'w':
                this.isWPressed = false; 
                break;
            case 'a':
                this.isAPressed = false;
                break;
            case 's':
                this.isSPressed = false; 
                break;
            case 'd':
                this.isDPressed = false; 
                break;
            case ' ':
                this.isSpacePressed = false; 
                break;
        }
    }

    getAxisX(): number {
        if (this.isAPressed) {
            return -1;
        }
        if (this.isDPressed) {
            return 1;
        }
        return 0;
    }

    getAxisY(): number {
        if (this.isWPressed) {
            return 1;
        }
        if (this.isSPressed) {
            return -1;
        }
        return 0;
    }

    getActionButton(): boolean {
        return this.isSpacePressed; 
    }    
}
