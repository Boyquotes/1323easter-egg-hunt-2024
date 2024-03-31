import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PositionalAudioHelper } from "three/addons/helpers/PositionalAudioHelper.js";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.params = {
            fov: 75,
            aspect: this.sizes.aspect,
            near: 0.001,
            far: 1000,
        };

        this.setPerspectiveCamera();
        // this.setOrbitControls();
    }

    setPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            this.params.fov,
            this.params.aspect,
            this.params.near,
            this.params.far
        );
        this.scene.add(this.perspectiveCamera);

        this.perspectiveCamera.position.set(29.485, 1, -9.1);
        this.perspectiveCamera.rotation.y = Math.PI / 2;
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
    }

    onResize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
    }

    update() {
        if (this.controls) this.controls.update();
    }
}
