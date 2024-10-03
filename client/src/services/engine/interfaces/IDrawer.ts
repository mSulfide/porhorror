import { TDrawRequest } from "../types";

export default interface IDrawer {
    draw(request: TDrawRequest): void;

    clear(): void;
}