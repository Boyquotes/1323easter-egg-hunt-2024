import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "../Experience.js";
import Office from "./Office.js";
import Environment from "./Environment.js";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.office = new Office();
            this.emit("worldready");
        });
    }

    update() {
        if (this.office) this.office.update();
    }
}
