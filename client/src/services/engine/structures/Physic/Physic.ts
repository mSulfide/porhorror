import { CircleCollider } from ".";

class Physic {
    private colliders: CircleCollider[] = [];

    update() {
        this.colliders.splice(0, this.colliders.length);
    }

    translate(collider: CircleCollider) {
        
    }
}

export default Physic;