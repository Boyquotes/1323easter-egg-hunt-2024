import * as THREE from "three";
import Experience from "../Experience.js";

export default class Office {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
    }

    setModel() {
        this.office = this.resources.items.office.scene;

        this.office.traverse((child) => {
            console.log(child);

            if (child.name === "blue_glass") {
            }
            if (child.name === "clear_glass") {
            }
            if (child.name === "ship_baked") {
                this.resources.items.ship_texture.flipY = false;
                this.resources.items.ship_texture.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.ship_texture,
                });
            }
            if (child.name === "extras_baked") {
                this.resources.items.extras_texture.flipY = false;
                this.resources.items.extras_texture.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.extras_texture,
                });
            }
            if (child.name === "building_baked") {
                this.resources.items.building_texture.flipY = false;
                this.resources.items.building_texture.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.building_texture,
                });
            }
        });

        this.scene.add(this.office);
    }

    resize() {}

    update() {}
}
