import { EImage, srcs } from "./images";
import { TSprite } from "../drawer/Renderer/types";
import { ESprite, sprites } from "./sprites";

type TResource = {
    id: EImage,
    image: HTMLImageElement,
    ready: boolean
}

class Resources {
    private storage: TResource[] = [];

    load(onload: () => void) {
        Object.values(EImage).forEach((key: EImage) => {
            const image = new Image();
            image.src = srcs[key];
            const resource = { id: key, image: image, ready: false };
            this.storage.push(resource);
            image.onload = () => {
                resource.ready = true;
                this.storage.findIndex(resource => !resource.ready) === -1 && onload();
            };
        });
    }

    getImage(image: EImage): HTMLImageElement | null {
        const resource = this.storage.find(resource => resource.id === image);
        return resource?.ready ? resource.image : null;
    }

    getSprite(spriteId: ESprite): TSprite | null {
        const sprite = sprites[spriteId];
        if (sprite) {
            const { image, offset, size } = sprite;
            const map = this.getImage(image);
            return map && { image: map, offset, size };
        }
        return null;
    }
}

export default Resources;