// MegaDrawer.ts
import * as THREE from 'three';
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
        this.camera.position.set(0, 0, 10); // Смена позиции камеры на (0, 0, 10)

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement); // Добавляем канвас на страницу

        // Запуск цикла отрисовки
        this.animate();
    }

    public drawSprite(position: Point): void {
        // Очищаем сцену для предотвращения накопления объектов
        this.scene.clear();

        // Создаем новый куб и устанавливаем его позицию
        const geometry = new THREE.BoxGeometry(1, 1, 1); // Куб с размером 1
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Зеленый цвет
        const cube = new THREE.Mesh(geometry, material);

        // Устанавливаем позицию куба
        cube.position.set(position.x, position.y, 0); // Устанавливаем позицию куба
        this.scene.add(cube); // Добавляем куб в сцену
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }
}