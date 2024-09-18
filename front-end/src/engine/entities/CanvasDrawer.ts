import IDrawer from "../structures/IDrawer";

class MegaDrawer implements IDrawer {
    drawSprite(position: {x: number, y: number}): void {
        // Используем контекст HTML канваса для рисования
        const canvas = document.getElementById('yourCanvasId') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        if (ctx) {
            // Пример отрисовки: закрашиваем спрайт прямоугольником
            ctx.fillStyle = 'blue'; // Цвет спрайта
            ctx.fillRect(position.x, position.y, 50, 50); // Отрисовка размером 50x50
        }
    }
}

export default MegaDrawer;
