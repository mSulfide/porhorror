import { TPoint, zero } from "../../../services/math";
import { EImage } from "../images";

class Sprite {
    image: EImage;
    size: TPoint;
    offset: TPoint = zero();

    constructor(image: EImage, size: TPoint, offset?: TPoint) {
        this.image = image;
        this.size = size;
        offset && this.setPosition(offset.x, offset.y);
    }

    setPosition(x: number, y: number) {
        this.offset = { x: this.size.x * x, y: this.size.y * y };
    }
}

export default Sprite;