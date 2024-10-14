import { Scene } from "../../engine/structures";
import { IDrawer } from "../IDrawer";
import sprite from "../../../assets/img/tas.png"

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
        this.scene.forEach(object => {
            const { x, y } = object.position;
            if (this.isReady)
                this.drawer.draw({ image: this.image, x, y });
        });
        //пример использования метода drawFunction
        this.drawer.drawFunction(
            (x)=>x,
            'red',
            3
        )
    }
}