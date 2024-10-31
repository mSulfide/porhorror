import { TPoint } from "../..";
import CircleCollider from "./Collider/CircleCollider";

export interface ICollider {
    collide(collider: CircleCollider, offset: TPoint): THitInfo | null;
}

export type THitInfo = {
    point: TPoint,
    normal: TPoint
}

export { CircleCollider }