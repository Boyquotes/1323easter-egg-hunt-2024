import * as THREE from "three";
import Experience from "../Experience.js";

export default class Office {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.octree = this.experience.world.octree;

        this.setModel();
        this.setLandscapeCollider();
    }

    setModel() {
        this.full_model_easter = this.resources.items.full_model_easter.scene;

        this.full_model_easter.traverse((child) => {
            if (child.name === "Red_Glass") {
                child.material = new THREE.MeshPhysicalMaterial({});
                child.material.roughness = 0;
                child.material.color.set(0x95caff);
                child.material.ior = 1.5;
                child.material.transmission = 1;
                child.material.opacity = 1;
                child.side = THREE.DoubleSide;
            }
            if (child.name === "Black_Glass") {
                child.material = new THREE.MeshPhysicalMaterial({});
                child.material.roughness = 0;
                child.material.color.set(0xdfe5f5);
                child.material.ior = 1.5;
                child.material.transmission = 1;
                child.material.opacity = 1;
                child.side = THREE.DoubleSide;
            }
            if (child.name === "Car_Baked") {
                this.resources.items.car_baked.flipY = false;
                this.resources.items.car_baked.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.car_baked,
                });
            }
            if (child.name === "Platforms_Baked") {
                this.resources.items.platforms_baked.flipY = false;
                this.resources.items.platforms_baked.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.platforms_baked,
                });
            }
            if (child.name === "Pictures_Baked") {
                this.resources.items.pictures_baked.flipY = false;
                this.resources.items.pictures_baked.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.pictures_baked,
                    side: THREE.DoubleSide,
                });
            }
            if (child.name === "Walls_Baked") {
                this.resources.items.walls_baked.flipY = false;
                this.resources.items.walls_baked.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.walls_baked,
                    side: THREE.DoubleSide,
                });
            }
            if (child.name === "Easter_Baked") {
                this.resources.items.easter_baked.flipY = false;
                this.resources.items.easter_baked.colorSpace =
                    THREE.SRGBColorSpace;
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.easter_baked,
                    side: THREE.DoubleSide,
                });
            }
        });

        this.scene.add(this.full_model_easter);
    }

    setLandscapeCollider() {
        const collider = this.full_model_easter.getObjectByName("Octree");
        this.octree.fromGraphNode(collider);
        collider.removeFromParent();
        collider.geometry.dispose();
        collider.material.dispose();
    }
}
