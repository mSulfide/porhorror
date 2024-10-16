import CircleCollider from "./Collider/Collider";

export interface ICollider {
    collide(collider: CircleCollider): boolean;
}

export { CircleCollider }