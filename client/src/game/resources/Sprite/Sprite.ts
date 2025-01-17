import { TPoint, zero } from "../../../services/math";
import { EImage } from "../images";

class Sprite {
    image: EImage;
    size: TPoint;
    offset: TPoint = zero();

    constructor(image: EImage, size: TPoint) {
        this.image = image;
        this.size = size;
    }

    setPosition(x: number, y: number) {
        this.offset = { x, y };
    }
}

export default Sprite;