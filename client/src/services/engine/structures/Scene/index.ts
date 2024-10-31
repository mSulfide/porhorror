import { IUpdatable, IRenderer } from "../.."
import { CircleCollider, ICollider } from "../Physic"

export type TScene = {
    updatable?: IUpdatable[],
    staticColliders?: ICollider[],
    dynamicColliders?: CircleCollider[],
    renderers?: IRenderer[]
}