import { CircleCollider, THitInfo } from ".";
import { Vector } from "..";
import Scene from "../Scene/Scene";

type TTransposition = {
    collider: CircleCollider,
    offset: Vector,
    cb?: (hit: THitInfo) => void
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
                    if (collision) {
                        collision.collider.position.x -= collision.offset.x;
                        collision.collider.position.y -= collision.offset.y;
                        collision.offset.x = 0;
                        collision.offset.y = 0;
                    }
                }
            });
        });
        this.scene.forEachDynamic(colliderA => {
            this.scene.forEachDynamic(colliderB => {
                if (colliderA != colliderB && colliderA.collide(colliderB)) {
                    const collision = this.transpositions.find((transposition: TTransposition) => transposition.collider == colliderB);
                    if (collision) {
                        collision.collider.position.x -= collision.offset.x;
                        collision.collider.position.y -= collision.offset.y;
                        collision.offset.x = 0;
                        collision.offset.y = 0;
                    }
                }
            });
        });
        this.transpositions.splice(0, this.transpositions.length);
    }

    translate(collider: CircleCollider, offset: Vector) {
        collider.position.x += offset.x;
        collider.position.y += offset.y;
        this.transpositions.push({ collider, offset });
    }
}

export default Physic;