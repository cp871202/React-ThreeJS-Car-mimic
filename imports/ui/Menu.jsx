import React from 'react';
import * as THREE from 'three-full';
import { initMaterials } from './Material';
class Menu extends React.Component {
  materialsLib = this.props.materialsLib;
  color = this.props.color;
  rimCol = this.props.rimCol;
  glassCol = this.props.glassCol;

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

    bodyMatSelect.selectedIndex = this.color;
    rimMatSelect.selectedIndex = this.rimCol;
    glassMatSelect.selectedIndex = this.glassCol;
  }

  render() {
    const { onChange, rimChange, glassChange } = this.props;
    return (
      <div id="info">
        <span>
          Body: <select id="body-mat" onChange={onChange} />
        </span>
        <span>
          Rims / Trim: <select id="rim-mat" onChange={rimChange} />
        </span>
        <span>
          Glass: <select id="glass-mat" onChange={glassChange} />
        </span>

        <span>
          Follow camera: <input type="checkbox" id="camera-toggle" />
        </span>
      </div>
    );
  }
}

export default Menu;
