import * as THREE from "three";
import Experience from "../Experience.js";

export default class Car {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setModel();
    }

    setModel() {
        this.car = this.resources.items.car.scene;
        this.scene.add(this.car);
    }

    update() {
        if (this.car.position.x > 150) {
            this.car.position.x = 0;
        }
        this.car.position.x += 0.15;
    }
}
