import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "../Experience.js";
import Office from "./Office.js";
import Environment from "./Environment.js";
import { Octree } from "three/addons/math/Octree.js";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.octree = new Octree();

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.office = new Office();
            this.emit("worldready");
        });
    }

    update() {
        if (this.car) this.car.update();
    }
}
