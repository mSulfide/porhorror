import { CircleCollider } from ".";
import { Vector } from "..";
import Scene from "../Scene/Scene";

type TTransposition = {
    collider: CircleCollider,
    offset: Vector
}

class Physic {
    private transpositions: TTransposition[] = [];
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    update() {
        this.scene.forEachStatic(colliderA => {
            this.scene.forEachDynamic(colliderB => {
                if (colliderA.collide(colliderB)) {
                    const collision = this.transpositions.find((transposition: TTransposition) => transposition.collider == colliderB);
                    //обработчик столкновения со статикой
                    console.log("Static collision", colliderA, colliderB);
                }
            });
        });
        this.scene.forEachDynamic(colliderA => {
            this.scene.forEachDynamic(colliderB => {
                if (colliderA != colliderB && colliderA.collide(colliderB)) {
                    const collision = this.transpositions.find((transposition: TTransposition) => transposition.collider == colliderB);
                    //обработчик столкновения с динамикой
                    console.log("Dynamic collision", colliderA, colliderB);
                }
            });
        });
        this.transpositions.splice(0, this.transpositions.length);
    }

    translate(collider: CircleCollider, offset: Vector) {
        this.transpositions.push({ collider, offset });
    }
}

export default Physic;