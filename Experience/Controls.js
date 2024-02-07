import * as THREE from "three";
import Experience from "./Experience.js";
import GSAP from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Lenis from "@studio-freight/lenis";

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

        GSAP.registerPlugin(ScrollTrigger);

        this.interactiveSVG = document.querySelector(".interactive-svg");
        this.closeButton = document.querySelector(".close-button");
        this.sideBar = document.querySelector(".side-bar");

        this.currentScaleX = 0;
        this.currentScaleY = 0;
        this.currentRotateZ = 0;

        this.targetScaleX = 0;
        this.targetScaleY = 0;
        this.targetRotateZ = 0;

        this.setRaycaster();
        this.setSmoothScroll();
        this.setEventListeners();
    }

    setSmoothScroll() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothTouch: true,
        });

        this.lenis.on("scroll", (e) => {
            ScrollTrigger.update;
        });

        GSAP.ticker.add((time) => {
            this.lenis.raf(time * 1000);
        });

        GSAP.ticker.lagSmoothing(0);
    }

    setRaycaster() {
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
    }

    setEventListeners() {
        window.addEventListener("pointermove", this.onPointerMove);
        window.addEventListener("click", this.onClick);

        this.closeButton.addEventListener("click", () => {
            GSAP.to(this.sideBar, {
                x: "-100%",
                ease: "power4.inOut", // Easing function
                onComplete: () => {
                    this.sideBar.classList.add("hidden");
                },
            });
        });
    }

    onPointerMove = (e) => {
        this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

        this.targetScaleX = -0.18 * this.pointer.x * this.pointer.x + 0.99;
        this.targetScaleY = -0.18 * this.pointer.y * this.pointer.y + 0.99;
        this.targetRotateZ = this.pointer.x * 12;
    };

    onClick = () => {
        if (this.activeSelection && this.camera.controls.enablePan) {
            this.sideBar.classList.remove("hidden");
            this.camera.controls.enablePan = false;
            this.camera.controls.enableRotate = false;
            this.camera.controls.enableZoom = false;
            GSAP.to(this.sideBar, {
                x: "0%",
                ease: "power4.inOut", // Easing function
            });
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
                onComplete: () => {
                    this.camera.controls.enablePan = true;
                    this.camera.controls.enableRotate = true;
                    this.camera.controls.enableZoom = true;
                },
            });
        }
    };

    update() {
        if (this.interactiveSVG) {
            let setScaleX = GSAP.utils.interpolate(
                this.currentScaleX,
                this.targetScaleX,
                0.02
            );
            let setScaleY = GSAP.utils.interpolate(
                this.currentScaleY,
                this.targetScaleY,
                0.02
            );
            let setRotateZ = GSAP.utils.interpolate(
                this.currentRotateZ,
                this.targetRotateZ,
                0.02
            );

            this.interactiveSVG.style.transform = `scale3d(${setScaleX}, ${setScaleY}, 1) rotateZ(${setRotateZ}deg)`;

            this.currentScaleX = setScaleX;
            this.currentScaleY = setScaleY;
            this.currentRotateZ = setRotateZ;
        }

        //raycaster
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
