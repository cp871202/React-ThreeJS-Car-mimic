import React from 'react';
import * as THREE from 'three-full';

class Menu extends React.Component {
  envMap = this.props;
  materialsLib = {
    main: [
      new THREE.MeshStandardMaterial({
        color: 0xff4400,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.2,
        name: 'orange'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x001166,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.2,
        name: 'blue'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x990000,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.2,
        name: 'red'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.5,
        name: 'black'
      }),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.5,
        name: 'white'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x555555,
        envMap: this.envMap,
        envMapIntensity: 2.0,
        metalness: 1.0,
        roughness: 0.2,
        name: 'metallic'
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
      }),
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.1,
        opacity: 0.15,
        transparent: true,
        premultipliedAlpha: true,
        name: 'smoked'
      }),
      new THREE.MeshStandardMaterial({
        color: 0x001133,
        envMap: this.envMap,
        metalness: 0.9,
        roughness: 0.1,
        opacity: 0.15,
        transparent: true,
        premultipliedAlpha: true,
        name: 'blue'
      })
    ]
  };

  addOption = (name, menu) => {
    const option = document.createElement('option');
    option.text = name;
    option.value = name;
    menu.add(option);
  };

  componentDidMount() {
    const materialsLib = this.materialsLib;
    const addOption = this.addOption;

    const bodyMatSelect = document.getElementById('body-mat');
    const rimMatSelect = document.getElementById('rim-mat');
    const glassMatSelect = document.getElementById('glass-mat');

    materialsLib.main.forEach(function(material) {
      addOption(material.name, bodyMatSelect);
      addOption(material.name, rimMatSelect);
    });
    materialsLib.glass.forEach(function(material) {
      addOption(material.name, glassMatSelect);
    });
    bodyMatSelect.selectedIndex = 2;
    rimMatSelect.selectedIndex = 4;
    glassMatSelect.selectedIndex = 0;
  }

  render() {
    return (
      <div id='info'>
        <span>
          Body: <select id='body-mat' />
        </span>
        <span>
          Rims / Trim: <select id='rim-mat' />
        </span>
        <span>
          Glass: <select id='glass-mat' />
        </span>

        <span>
          Follow camera: <input type='checkbox' id='camera-toggle' />
        </span>
      </div>
    );
  }
}

export default Menu;
