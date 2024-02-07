import * as THREE from "three";
import Experience from "../Experience.js";

export default class Office {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setModel();
    }

    setModel() {
        this.office = this.resources.items.office.scene;

        this.office.traverse((child) => {
            if (child.name === "blue_glass") {
                child.material = new THREE.MeshPhysicalMaterial({});
                child.material.roughness = 0;
                child.material.color.set(0x95caff);
                child.material.ior = 1.5;
                child.material.transmission = 1;
                child.material.opacity = 1;
                child.side = THREE.DoubleSide;
            }
            if (child.name === "clear_glass") {
                child.material = new THREE.MeshPhysicalMaterial({});
                child.material.roughness = 0;
                child.material.color.set(0xdfe5f5);
                child.material.ior = 1.5;
                child.material.transmission = 1;
                child.material.opacity = 1;
                child.side = THREE.DoubleSide;
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
                    side: THREE.DoubleSide,
                });
            }
        });

        this.scene.add(this.office);
    }
}
