import { Scene } from "../../engine/structures";
import { IDrawer } from "../IDrawer";
import sprite from "../../../assets/img/tas.png";
import Obstacle from "../../engine/entity/Obstacle/Obstacle"

export default class MainScreen {
    private drawer: IDrawer;
    private scene: Scene;
    private image: HTMLImageElement;
    private isReady: boolean = false;

    constructor(drawer: IDrawer, scene: Scene) {
        this.drawer = drawer;
        this.scene = scene;
        this.image = new Image();
        this.image.src = sprite;
        this.image.onload = () => this.isReady = true;
    }

    public render() {
        this.drawer.clear();
        this.scene.forEachUpdated(object => {
            const { x, y } = object.position;
            if (object instanceof Obstacle) {
                this.drawer.drawFunction(
                    (x) => object.getValueAt(x), // Используем getValueAt для получения значения функции
                    'red',
                    3
                );
            }
            else if (this.isReady)
                this.drawer.draw({ image: this.image, x, y });
        });
    }
}