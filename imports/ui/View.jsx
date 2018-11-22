import React from 'react';
import * as THREE from 'three-full';
import Menu from './Menu';
import { thecar } from './Ferrari';

class View extends React.Component {
  //Camera
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    200
  );

  //Scene
  scene = new THREE.Scene();

  //EnvMap
  envMap = new THREE.CubeTextureLoader()
    .setPath('textures/cube/skyboxsun25deg/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

  //Ground
  ground = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2400, 2400),
    new THREE.ShadowMaterial({
      color: 0x000000,
      opacity: 0.15,
      depthWrite: false
    })
  );

  //Grid
  grid = new THREE.GridHelper(400, 40, 0x000000, 0x000000);

  //heimilight
  hemiLight = new THREE.HemisphereLight(0x7c849b, 0xd7cbb1, 0.1);

  //shadow Light
  shadowLight = new THREE.DirectionalLight(0xffffee, 0.1);

  lightHolder = new THREE.Group();
  clock = new THREE.Clock();
  car = new THREE.Car();

  carParts = {
    body: [
      new THREE.MeshStandardMaterial({
        color: 0xff4400,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.2,
        name: 'orange'
      })
    ],
    rims: [
      new THREE.MeshStandardMaterial({
        color: 0xff4400,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.2,
        name: 'orange'
      })
    ],
    glass: [
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.1,
        opacity: 0.15,
        transparent: true,
        premultipliedAlpha: true,
        name: 'clear'
      })
    ]
  };
  damping = 5.0;
  distance = 5;
  cameraTarget = new THREE.Vector3();
  origin = new THREE.Vector3();

  renderer = new THREE.WebGLRenderer({ antialias: true });

  clock = new THREE.Clock();

  componentDidMount() {
    const camera = this.camera;
    camera.position.set(3.25, 2.0, -5);

    const scene = this.scene;
    scene.fog = new THREE.Fog(0xd7cbb1, 1, 80);

    const envMap = this.envMap;
    scene.background = envMap;

    const ground = this.ground;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.renderOrder = 1;
    scene.add(ground);

    const grid = this.grid;
    grid.material.opacity = 0.2;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    scene.add(grid);

    const hemiLight = this.hemiLight;
    hemiLight.position.set(0, 1, 0);
    scene.add(hemiLight);

    const shadowLight = this.shadowLight;
    shadowLight.position.set(-1.5, 1.25, -1.5);
    shadowLight.castShadow = true;
    shadowLight.shadow.width = 512;
    shadowLight.shadow.height = 512;
    shadowLight.shadow.camera.top = 2;
    shadowLight.shadow.camera.bottom = -2;
    shadowLight.shadow.camera.left = -2.5;
    shadowLight.shadow.camera.right = 2.5;
    shadowLight.shadow.camera.far = 5.75;
    shadowLight.shadow.bias = -0.025;

    const lightHolder = this.lightHolder;
    lightHolder.add(shadowLight, shadowLight.target);

    const renderer = this.renderer;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;

    thecar(lightHolder, this.car, envMap, scene, this.carParts, camera);
    // console.log(thecar(lightHolder, this.car, envMap, scene, this.carParts));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    renderer.setAnimationLoop(function() {
      renderer.render(scene, camera);
    });
  }
  render() {
    const envMap = this.envMap;
    return (
      <div>
        <Menu envMap={envMap} />
        <div id="container" />
      </div>
    );
  }
}

export default View;
