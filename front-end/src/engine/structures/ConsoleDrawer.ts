import IDrawer from "../interfaces/IDrawer";
import { TDrawRequest } from "../types";

export default class ConsoleDrawer implements IDrawer {
    draw(request: TDrawRequest): void {
        console.log(request.position);
    }

    clear(): void {
        
    }
}