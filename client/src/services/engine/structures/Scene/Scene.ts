import { IGameObject } from "../..";

export default class Scene {
    private objects: IGameObject[] = [];

    constructor(objects: IGameObject[] = []) {
        objects?.forEach((gameObject: IGameObject) => {
            this.objects.push(gameObject);
        });
    }

    public forEach(action: (gameObject: IGameObject) => void) {
        this.objects.forEach(action);
    }

    public addObject(object: IGameObject, parent: IGameObject): void {
        this.objects.push(object);
    }
}