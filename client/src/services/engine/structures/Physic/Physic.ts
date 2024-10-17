import { CircleCollider, THitInfo } from ".";
import { Vector } from "..";
import { TPoint } from "../..";
import { add } from "../../math";
import Scene from "../Scene/Scene";

type TTransposition = {
    collider: CircleCollider,
    offset: TPoint,
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
            const hit = this.findCollision(move.collider, move.offset);
            if (hit) {
                if (move.cb)
                    move.cb(hit);
            }
            else {
                move.collider.position = add(move.collider.position, move.offset);
            }
        });

        this.movements.splice(0, this.movements.length);
    }

    translate(collider: CircleCollider, offset: TPoint) {
        this.movements.push({ collider, offset });
    }

    private findCollision(colliderA: CircleCollider, offset: TPoint): THitInfo | null {
        const scene = this.scene;
        scene.forEachStatic(colliderB => {
            const hit = colliderB.collide(colliderA, offset);
            if (hit)
                return hit;
        })
        return null;
    }
}

export default Physic;