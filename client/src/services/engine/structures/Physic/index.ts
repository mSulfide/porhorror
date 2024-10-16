import CircleCollider from "./Collider/CircleCollider";

export interface ICollider {
    collide(collider: CircleCollider): boolean;
}

export { CircleCollider }