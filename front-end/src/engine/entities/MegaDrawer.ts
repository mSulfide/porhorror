// MegaDrawer.ts
/*import * as THREE from 'three';
import IDrawer from '../structures/IDrawer';
import { Point } from '../structures';

export default class MegaDrawer implements IDrawer {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;

    constructor() {
        // Инициализация Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5; // позиция камеры

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement); // Добавляем канвас на страницу

        // Запуск цикла отрисовки
        this.animate();
    }

    public drawSprite(position: Point): void {
        // Удаляем предыдущий спрайт, если он существует
        this.scene.clear(); // Очищаем сцену, если нужно

        // Создание нового куба
        const geometry = new THREE.BoxGeometry(1, 1, 1); // Геометрия куба
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Зеленый материал
        const cube = new THREE.Mesh(geometry, material);

        // Преобразование игровых координат в координаты Three.js
        cube.position.set(position.x, position.y, 0); // Устанавливаем позицию игрока
        this.scene.add(cube); // Добавляем куб в сцену
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }
}*/



import { Point } from "../structures";
import IDrawer from "../structures/IDrawer";

export default class MegaDrawer implements IDrawer {
    drawSprite(position: Point): void {
        console.log(position);
    }
}