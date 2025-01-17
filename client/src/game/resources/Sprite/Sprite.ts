import { TPoint, one } from "../../../services/math";
import { EImage } from "../images";

type TLayer = {
    
}

class Sprite {
    image: EImage;
    offset: TPoint;
    size: TPoint;

    constructor(image: EImage, offset?: TPoint, size?: TPoint) {
        this.image = image;
        this.offset = offset || one();
        this.size = size || one();
    }
}

export default Sprite;