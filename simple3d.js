import * as THREE from 'three';
import {
    OutlinePass
} from 'OutlinePass';
import {
    EffectComposer
} from 'EffectComposer';
import {
    RenderPass
} from 'RenderPass';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.overlayMaterial.blending = THREE.SubtractiveBlending // for black lines
composer.addPass(outlinePass);


export default class Simple3d {

    static color = "white";
    static camera = camera;

    static cube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            color: Simple3d.color
        });
        const cube = new THREE.Mesh(geometry, material);
        outlinePass.selectedObjects.push(cube);
        scene.add(cube);
        return cube;
    }


    static polyline(pts) {
        const material = new THREE.LineBasicMaterial({
            color: Simple3d.color
        });

        const points = pts.map((p) => new THREE.Vector3(...p));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        outlinePass.selectedObjects.push(line);
        return line;
    }


    static sphere(center, radius) {
        const geometry = new THREE.SphereGeometry(radius, 32, 16);
        const material = new THREE.MeshBasicMaterial({
            color: Simple3d.color
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = center[0];
        sphere.position.y = center[1];
        sphere.position.z = center[2];
        outlinePass.selectedObjects.push(sphere);
        scene.add(sphere);
    }

    static background() {
        scene.background = new THREE.Color(Simple3d.color);
    }


    static floor() {
        var geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
        var material = new THREE.MeshBasicMaterial({
            color: Simple3d.color
        });
        var floor = new THREE.Mesh(geometry, material);
        floor.material.side = THREE.DoubleSide;
        floor.rotation.x = Math.PI / 2;
        scene.add(floor);
    }

    static tube(func, radiusTube) {
        class CustomCurve extends THREE.Curve {
            constructor(scale = 1) {
                super();
                this.scale = scale;
            }

            getPoint(t, optionalTarget = new THREE.Vector3()) {
                const p = func(t);
                const tx = p[0];
                const ty = p[1];
                const tz = p[2];


                return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
            }
        }

        const path = new CustomCurve(1);
        const geometry = new THREE.TubeGeometry(path, 20, radiusTube, 8, false);
        const material = new THREE.MeshBasicMaterial({
            color: Simple3d.color
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        outlinePass.selectedObjects.push(mesh);
        return mesh;
    }




    /*  static camera(position, lookat) {
          camera.position.set(position[0], position[1], position[2]);
          camera.lookAt(lookat[0], lookat[1], lookat[2]);
          camera.rotation.z = Math.PI
      }*/
}





//const c = cube();




//const tub = tube((t) => [Math.cos(t), Math.sin(t), 1 * Math.sin(t)], 0.1);

function animate() {
    //tub.rotation.y += 0.01;
    requestAnimationFrame(animate);
    composer.render()
}
animate();