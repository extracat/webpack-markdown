import _ from 'lodash';

import md from "./index.md";


function component() {
  const element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = md;

  return element;
}

document.body.appendChild(component());