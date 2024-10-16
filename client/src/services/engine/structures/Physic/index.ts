import { TPoint } from "../..";
import Vector from "../Vector/Vector";
import CircleCollider from "./Collider/CircleCollider";

export interface ICollider {
    collide(collider: CircleCollider): boolean;
}

export type THitInfo = {
    point: TPoint,
    normal: Vector
}

export { CircleCollider }