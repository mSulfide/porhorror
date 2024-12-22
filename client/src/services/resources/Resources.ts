import { EImage, srcs } from ".";

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
}

export default Resources;