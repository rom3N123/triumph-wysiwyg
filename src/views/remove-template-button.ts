import { $selectedTemplateId, removeTemplateById } from "../models/templates";

export class RemoveTemplateButton extends HTMLElement {
  private shadow: ShadowRoot;
  private ref: HTMLButtonElement | null = null;

  static componentName = "remove-template-button";

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    this.render();
    this.createRef();
    this.addClickListener();
  }

  private onClick() {
    const id = $selectedTemplateId.getState();

    if (id) {
      removeTemplateById(id);
    }
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
      <button>-</button>
    `;
  }

  render() {
    this.shadow.innerHTML = this.getUi();
  }
}
