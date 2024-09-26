import IDrawer from "../interfaces/IDrawer";
import { TDrawRequest } from "../types";
import Scene from "./Scene";
import { TPoint, TCircle } from "../types";

export default class MainScreen {

    private _drawer: IDrawer;
    private _width: number;
    private _height: number;
    private _position: TPoint;

    constructor(drawer: IDrawer, width: number = 16, height: number = 9, position: TPoint = {x: 0, y: 0}) {
        this._drawer = drawer;
        this._width = width;
        this._height = height;
        this._position = position;
    }

    public render(scene: Scene) {
        const drawRequests: TDrawRequest[] = [];
        this._drawer.clear();
        scene.forEach(gameObject => {
            gameObject.render((request: TDrawRequest) => {
                drawRequests.push(request);
            });
        });
        drawRequests.forEach(request => {
            if (this.isVisible({ radius: request.radius, position: request.position })) {
                this._drawer.draw(request);
            }
        });
    };

    private isVisible(circle: TCircle): boolean {
        const distance: TPoint = { 
            x: Math.abs(circle.position.x - this._position.x),
            y: Math.abs(circle.position.y - this._position.y)
        }
        return (distance.x <= (this._width/2)) || (distance.y <= (this._height/2));
    }
}