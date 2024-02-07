import * as THREE from "three";
import Experience from "./Experience.js";
import GSAP from "gsap";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.outside = this.experience.world.outside.outside;
        this.activeSelection = false;
        this.intersectObjects = [this.outside.children[1]];
        this.originalMaterial = this.intersectObjects.material;

        this.setRaycaster();
        this.setEventListeners();
    }

    setRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
    }

    setEventListeners() {
        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("click", this.onClick);
    }

    onPointerMove = (e) => {
        this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    onClick = () => {
        if (this.activeSelection) {
            GSAP.to(this.camera.controls.target, {
                x: 0.54,
                y: 2.77,
                z: -4.9,
                duration: 2,
                ease: "power2.out",
            });

            GSAP.to(this.camera.perspectiveCamera.position, {
                x: -23,
                y: 2.77,
                z: -5.73,
                duration: 2,
                ease: "power2.out",
            });
        }
    };

    update() {
        this.raycaster.setFromCamera(
            this.pointer,
            this.camera.perspectiveCamera
        );

        const intersects = this.raycaster.intersectObjects(
            this.intersectObjects
        );

        if (intersects.length) {
            if (!this.activeSelection) {
                document.body.style.cursor = "pointer";
            }

            this.activeSelection = intersects[0];
            this.activeSelection.object.material.color.set(0x1eda44);
        } else {
            if (this.activeSelection) {
                document.body.style.cursor = "auto";
                this.activeSelection.object.material.color.set(0xffffff);
            }
            this.activeSelection = null;
        }
    }
}
