import html from "./index.md";
import "./style.scss";

function component() {
  const element = document.createElement('div');
  element.innerHTML = html;
  element.className = "markdown-body"
  return element;
}

document.body.appendChild(component());
