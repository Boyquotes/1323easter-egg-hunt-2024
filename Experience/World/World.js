import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "../Experience.js";
import Office from "./Office.js";
import Outside from "./Outside.js";
import Environment from "./Environment.js";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.office = new Office();
            this.outside = new Outside();
            this.emit("worldready");
        });
    }

    update() {}
}
