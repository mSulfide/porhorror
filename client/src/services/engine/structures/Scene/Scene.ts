import { TScene } from ".";
import { IGameObject } from "../..";
import { CircleCollider, ICollider } from "../Physic";

class Scene {
    private objects: IGameObject[] = [];
    private staticColliders: ICollider[] = [];
    private dynamicColliders: CircleCollider[] = [];

    constructor(scene?: TScene) {
        if (scene) {
            const { updatable, staticColliders, dynamicColliders } = scene;
            updatable?.forEach((value: IGameObject) => {
                this.objects.push(value);
            });
            staticColliders?.forEach((value: ICollider) => {
                this.staticColliders.push(value);
            });
            dynamicColliders?.forEach((value: CircleCollider) => {
                this.dynamicColliders.push(value);
            });
        }
    }

    public forEachUpdated(action: (gameObject: IGameObject) => void) {
        this.objects.forEach(action);
    }

    public updateScene(scene: TScene) {
        this.update(this.objects, scene.updatable);
        this.update(this.staticColliders, scene.staticColliders);
        this.update(this.dynamicColliders, scene.dynamicColliders);
    }

    private update<T>(array: T[], values?: T[]): void {
        array.splice(0, array.length);
        values?.forEach((value: T) => {
            array.push(value);
        });
    }
}

export default Scene;