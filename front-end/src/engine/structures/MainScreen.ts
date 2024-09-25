import IDrawer from "../interfaces/IDrawer";
import { TDrawRequest } from "../types";
import Scene from "./Scene";

export default class MainScreen {
    private _drawer: IDrawer;

    constructor(drawer: IDrawer) {
        this._drawer = drawer;
    }

    public render(scene: Scene) {
        const drawRequests: TDrawRequest[] = [];
        scene.forEach(gameObject => {
            gameObject.render((request: TDrawRequest) => {
                drawRequests.push(request);
            });
        });
        drawRequests.forEach(request => {
            this._drawer.draw(request);
        });
    };
}