import { createTemplate } from "../models/templates";

export class CreateTemplateButton extends HTMLElement {
  private shadow: ShadowRoot;
  private ref: HTMLButtonElement | null = null;

  static componentName = "create-template-button";

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    this.render();
    this.createRef();
    this.addClickListener();
  }

  private onClick() {
    createTemplate();
  }

  private addClickListener() {
    if (this.ref) {
      this.ref.addEventListener("click", this.onClick);
    }
  }

  private createRef() {
    this.ref = this.shadow.querySelector("button");
  }

  getUi() {
    return `
      <button>+</button>
    `;
  }

  render() {
    this.shadow.innerHTML = this.getUi();
  }
}
