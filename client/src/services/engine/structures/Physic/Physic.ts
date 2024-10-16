import { CircleCollider, THitInfo } from ".";
import { Vector } from "..";
import { TPoint } from "../..";
import Scene from "../Scene/Scene";

type TTransposition = {
    collider: CircleCollider,
    offset: Vector,
    cb?: (hit: THitInfo) => void
}

class Physic {
    private movements: TTransposition[] = [];
    private scene: Scene;

    constructor(scene: Scene) {
        this.scene = scene;
    }

    update() {
        this.movements.forEach(move => {
            const point = this.findCollision(move.collider);
        });

        this.movements.splice(0, this.movements.length);
    }

    translate(collider: CircleCollider, offset: Vector) {
        this.movements.push({ collider, offset });
    }

    private findCollision(colliderA: CircleCollider): TPoint | null {
        const scene = this.scene;
        scene.forEachStatic(colliderB => {
            const point = colliderB.collide(colliderA);
            if (point)
                return point;
        })
        return null;
    }
}

export default Physic;