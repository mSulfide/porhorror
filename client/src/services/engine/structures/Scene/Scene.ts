import { TScene } from ".";
import { IUpdatable, IRenderer } from "../..";
import { Camera } from "../../entity";
import { CircleCollider, ICollider } from "../Physic";

class Scene {
    camera: Camera = new Camera(8.32, 6.24, this);
    private objects: IUpdatable[] = [this.camera];
    private staticColliders: ICollider[] = [];
    private dynamicColliders: CircleCollider[] = [];
    private renderers: IRenderer[] = [];

    constructor(scene?: TScene) {
        if (scene) {
            const { updatable, staticColliders, dynamicColliders, renderers } = scene;
            updatable?.forEach((value: IUpdatable) => {
                this.objects.push(value);
            });
            staticColliders?.forEach((value: ICollider) => {
                this.staticColliders.push(value);
            });
            dynamicColliders?.forEach((value: CircleCollider) => {
                this.dynamicColliders.push(value);
            });
            renderers?.forEach((value: IRenderer) => {
                this.renderers.push(value);
            });
        }
    }

    public forEachUpdated(action: (gameObject: IUpdatable) => void) {
        this.objects.forEach(action);
    }

    public forEachStatic(action: (collider: ICollider) => void) {
        this.staticColliders.forEach(action);
    }

    public forEachDynamic(action: (collider: CircleCollider) => void) {
        this.dynamicColliders.forEach(action);
    }

    public forEachRenederers(action: (renderer: IRenderer) => void) {
        this.renderers.forEach(action);
    }

    public updateScene(scene: TScene) {
        this.update(this.objects, scene.updatable);
        this.update(this.staticColliders, scene.staticColliders);
        this.update(this.dynamicColliders, scene.dynamicColliders);
        this.update(this.renderers, scene.renderers);
    }

    private update<T>(array: T[], values?: T[]): void {
        array.splice(0, array.length);
        values?.forEach((value: T) => {
            array.push(value);
        });
    }
}

export default Scene;