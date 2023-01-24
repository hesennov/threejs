// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
import { render } from "react-dom";
import "./index.css";

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//scene
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  // color: "#00ff83",
  color: "#0fd94f",
  // roughness
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//size

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//light

const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(1, 15, 20);
scene.add(light);

//camera
// const camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 100);
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//renderer

//! sual
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//sag click
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;
//resize

window.addEventListener("resize", () => {
  //update sizes
  console.log(window.innerWidth);
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update cameraa

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
  // mesh.position.y += 0.1;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();
