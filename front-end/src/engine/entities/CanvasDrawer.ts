import IDrawer from "../structures/IDrawer";

class CanvasDrawer implements IDrawer {
    private image: HTMLImageElement;

    constructor() {
        this.image = new Image(); // Создаем новый объект Image
        this.image.src = 'https://i.pinimg.com/originals/96/cb/ac/96cbac2f86d24d60798d2bd7062eb28a.png'; 
    }

    drawSprite(position: { x: number, y: number }): void {
        const canvas = document.getElementById('yourCanvasId') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        const spriteWidth = 50; // ширина спрайта
        const spriteHeight = 50; // высота спрайта
        if (ctx && this.image.complete) { 
            // Вычисляем центр, чтобы разместить спрайт
            const centerX = position.x + canvas.width / 2 - (spriteWidth / 2);
            const centerY = position.y + canvas.height / 2 - (spriteHeight / 2);

            // Отрисовка изображения
            ctx.drawImage(this.image, centerX, centerY, spriteWidth, spriteHeight);
        } 
    }
    }

export default CanvasDrawer;
