import Simple3d from "./simple3d.js";

//Simple3d.cube();


/*
const M = 5;
Simple3d.color = "red";
const tube = Simple3d.tube((t) => [Math.cos(M * t), M * t, 0], 0.1);
Simple3d.color = "#AAAAAA";
const tube2 = Simple3d.tube((t) => [Math.sin(M * t), M * t, 1 * Math.sin(M * t)], 0.1);
*/


function tree(position) {
    const M = Math.random() * 5 + 4;
    const A = Math.random();
    Simple3d.color = `rgb(${64+Math.floor(Math.random()*128)},${16+Math.floor(Math.random()*32)},0)`;;
    const trunk = Simple3d.tube((t) => [position[0] + A * Math.cos(M * t), position[1] + M * t, position[2]], 0.5);
    Simple3d.color = `rgb(0, ${Math.floor(Math.random()*255)},0)`;
    const feuillage = Simple3d.sphere([position[0] + A * Math.cos(M), position[1] + M, position[2]], 2);
}


Simple3d.color = "pink";
Simple3d.background();

Simple3d.color = "green";
Simple3d.floor();
for (let i = 0; i <= 100; i++)
    tree([Math.random() * 100, 0, Math.random() * 100]);

let cameraAngle = -Math.PI / 2;

window.onkeydown = (evt) => {
    /*switch(evt.keyCode) {
        case 37: Simple3d.camera.position.x -= 0.1; break;
        case 38: Simple3d.camera.position.z -= 0.1; break;
        case 39: Simple3d.camera.position.x += 0.1; break;
        case 40: Simple3d.camera.position.z += 0.1; break;
    }*/
    /*switch(evt.keyCode) {
        case 37: Simple3d.camera.position.x -= 0.1; break;
        case 38: Simple3d.camera.position.y += 0.1; break;
        case 39: Simple3d.camera.position.x += 0.1; break;
        case 40: Simple3d.camera.position.y -= 0.1; break;
    }*/
    const STEP = 0.5;
    Simple3d.camera.position.y = 2;
    switch (evt.keyCode) {
        case 37:
            cameraAngle -= 0.1;
            break;
        case 38:
            Simple3d.camera.position.x += STEP * Math.cos(cameraAngle);
            Simple3d.camera.position.z += STEP * Math.sin(cameraAngle);
            break;
        case 39:
            cameraAngle += 0.1;
            break;
        case 40:
            Simple3d.camera.position.x -= STEP * Math.cos(cameraAngle);
            Simple3d.camera.position.z -= STEP * Math.sin(cameraAngle);
            break;
    }


    Simple3d.camera.lookAt(Simple3d.camera.position.x + Math.cos(cameraAngle),
        Simple3d.camera.position.y,
        Simple3d.camera.position.z + Math.sin(cameraAngle),
    );

}