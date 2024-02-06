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

        GSAP.registerPlugin(ScrollTrigger);
        this.setSmoothScroll();
    }

    setEventListeners() {}

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

    update() {}
}
