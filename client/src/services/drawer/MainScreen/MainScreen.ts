import { IDrawer } from "../IDrawer";
import sprite from "../../../assets/img/tas.png";
import { FuncCollider } from "../../engine/entity";
import Camera from "../../engine/entity/Camera/Camera";
import { Scene } from "../../engine/structures";

export default class MainScreen {
    private drawer: IDrawer;
    private camera: Camera;
    private image: HTMLImageElement;
    private isReady: boolean = false;

    constructor(drawer: IDrawer, scene: Scene) {
        this.drawer = drawer;
        this.camera = scene.camera;
        this.image = new Image();
        this.image.src = sprite;
        this.image.onload = () => this.isReady = true;
    }

    public render() {
        this.drawer.clear();
        this.camera.vision.forEach(object => {
            const x = object.position.x * 2 / this.camera.width;
            const y = object.position.y * 2 / this.camera.height;
            if (object instanceof FuncCollider) {
                this.drawer.drawFunction(
                    (x) => object.getValueAt(x), // Используем getValueAt для получения значения функции
                    'red',
                    3
                );
            }
            else if (this.isReady)
                this.drawer.draw({ image: this.image, x: (x + 1) / 2, y: (y + 1) / 2 });
        });
    }
}