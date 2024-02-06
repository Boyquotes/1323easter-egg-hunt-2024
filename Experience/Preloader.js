import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";

export default class Preloader extends EventEmitter {
    constructor() {
        super();

        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.domElements = this.experience.domElements;
        this.world = this.experience.world;

        this.world.on("worldready", () => {
            this.playIntro();
        });
    }

    playIntro() {
        const t1 = new GSAP.timeline();
        // t1.set(".animatedis", { y: 0, yPercent: 100 });
        // t1.set(".ending-button", { y: 0, yPercent: 105 });
    }
}
