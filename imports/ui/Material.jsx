import * as THREE from 'three-full';

export function initMaterials(envMap) {
  return {
    main: [
      new THREE.MeshStandardMaterial({
        color: 0xff4400,
        envMap: envMap,
        metalness: 0.9,
        roughness: 0.2,
        name: 'orange'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x001166,
        envMap: envMap,
        metalness: 0.9,
        roughness: 0.2,
        name: 'blue'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x990000,
        envMap: envMap,
        metalness: 0.9,
        roughness: 0.2,
        name: 'red'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        envMap: envMap,
        metalness: 0.9,
        roughness: 0.5,
        name: 'black'
      }),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        envMap: envMap,
        metalness: 0.9,
        roughness: 0.5,
        name: 'white'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x555555,
        envMap: envMap,
        envMapIntensity: 2.0,
        metalness: 1.0,
        roughness: 0.2,
        name: 'metallic'
      })
    ],
    glass: [
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        envMap: envMap,
        metalness: 0.9,
        roughness: 0.1,
        opacity: 0.15,
        transparent: true,
        premultipliedAlpha: true,
        name: 'clear'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        envMap: envMap,
        metalness: 0.9,
        roughness: 0.1,
        opacity: 0.15,
        transparent: true,
        premultipliedAlpha: true,
        name: 'smoked'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x001133,
        envMap: envMap,
        metalness: 0.9,
        roughness: 0.1,
        opacity: 0.15,
        transparent: true,
        premultipliedAlpha: true,
        name: 'blue'
      })
    ]
  };
}
