import { IGameObject } from "../.."
import { CircleCollider, ICollider } from "../Physic"

export type TScene = {
    updatable?: IGameObject[],
    staticColliders?: ICollider[],
    dynamicColliders?: CircleCollider[]
}