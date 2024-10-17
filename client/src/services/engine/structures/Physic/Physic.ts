import { CircleCollider, THitInfo } from ".";
import { TPoint } from "../..";
import { add, dot, mlt, sub, zero } from "../../math";
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
                const scal = dot(hit.normal, move.offset);
                if (scal < 0)
                    move.offset = sub(move.offset, mlt(hit.normal, scal));
            }
            move.collider.position = add(move.collider.position, move.offset);
        });

        this.movements.splice(0, this.movements.length);
    }

    translate(collider: CircleCollider, offset: TPoint) {
        this.movements.push({ collider, offset });
    }

    private findCollision(colliderA: CircleCollider, offset: TPoint): THitInfo | null {
        let hit: THitInfo | null = null;
        this.scene.forEachStatic(colliderB => {
            hit ??= colliderB.collide(colliderA, offset);
        });
        return hit;
    }
}

export default Physic;