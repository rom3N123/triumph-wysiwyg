import { createTemplate } from "../models/templates";

export class RemoveTemplateButton extends HTMLElement {
  private shadow: ShadowRoot;

  static componentName = "remove-template-button";

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
    this.observeStore();
  }

  private observeStore() {}

  getUi() {
    return `
      <button>-</button>
    `;
  }

  render() {
    this.shadow.innerHTML = this.getUi();
  }
}
