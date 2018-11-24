import * as THREE from 'three-full';
import { initMaterials } from './Material';

export function thecar(
  lightHolder,
  car,
  envMap,
  scene,
  carParts,
  camera,
  bodyIndex,
  rimIndex,
  glassIndex
) {
  THREE.DRACOLoader.setDecoderPath('draco/');
  const loader = new THREE.GLTFLoader();
  loader.setDRACOLoader(new THREE.DRACOLoader());
  loader.load('models/gltf/ferrari.glb', function(gltf) {
    carModel = gltf.scene.children[0];
    // add lightHolder to car so that the shadow will track the car as it moves
    carModel.add(lightHolder);
    car.updateCarModel(
      carModel,
      (controls = {
        brake: false,
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
      })
    );
    carModel.traverse(function(child) {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.envMap = envMap;
      }
    });

    // shadow
    const texture = new THREE.TextureLoader().load(
      'models/gltf/ferrari_ao.png'
    );
    const shadow = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(0.655 * 4, 1.3 * 4).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({
        map: texture,
        opacity: 0.8,
        transparent: true
      })
    );
    shadow.renderOrder = 2;
    carModel.add(shadow);
    scene.add(carModel);
    camera.lookAt(carModel.position);
    // car parts for material selection
    carParts.body.push(carModel.getObjectByName('body'));
    carParts.rims.push(
      carModel.getObjectByName('rim_fl'),
      carModel.getObjectByName('rim_fr'),
      carModel.getObjectByName('rim_rr'),
      carModel.getObjectByName('rim_rl'),
      carModel.getObjectByName('trim')
    );
    const materialsLib = initMaterials(envMap);
    carParts.glass.push(carModel.getObjectByName('glass'));

    const bodyMat = materialsLib.main[bodyIndex];
    const rimMat = materialsLib.main[rimIndex];
    const glassMat = materialsLib.glass[glassIndex];
    carParts.body.forEach(function(part) {
      part.material = bodyMat;
    });
    carParts.rims.forEach(function(part) {
      part.material = rimMat;
    });
    carParts.glass.forEach(function(part) {
      part.material = glassMat;
    });
  });
}
