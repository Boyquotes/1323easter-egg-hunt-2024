import * as THREE from "three";
import Experience from "../Experience.js";

export default class Outside {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setModel();
    }

    setModel() {
        this.outside = this.resources.items.outside.scene;

        this.outside.traverse((child) => {
            if (child.name === "sign_baked") {
                this.resources.items.sign_texture.flipY = false;
                this.resources.items.sign_texture.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.sign_texture,
                });
            }
            if (child.name === "ground_baked") {
                this.resources.items.ground_texture.flipY = false;
                this.resources.items.ground_texture.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.ground_texture,
                });
            }
        });

        this.scene.add(this.outside);
    }
}
