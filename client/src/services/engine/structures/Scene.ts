import GameObject from "./GameObject";

export default class Scene {
    private _objects: GameObject[] = [];

    constructor(objects: GameObject[] = []) {
        objects?.forEach((gameObject: GameObject) => {
            this._objects.push(gameObject);
        });
    }

    public forEach(action: (gameObject: GameObject) => void) {
        this._objects.forEach(action);
    }
}