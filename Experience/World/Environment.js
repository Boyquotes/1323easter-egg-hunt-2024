import Experience from "../Experience.js";
import * as THREE from "three";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.setEnvironment();
    }

    setEnvironment() {
        this.scene.background = new THREE.Color("#F3F3F3");

        // this.environmentMap = this.resources.items.blenderHDR;
        // this.environmentMap.mapping = THREE.EquirectangularReflectionMapping;
        // this.scene.environment = this.environmentMap;
    }

    update() {}
}
