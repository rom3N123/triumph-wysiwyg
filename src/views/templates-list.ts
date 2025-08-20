import { $templates } from "../models/templates";

export class TemplatesList extends HTMLElement {
  private shadow: ShadowRoot;
  static componentName = "templates-list";

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
    this.observeStore();
  }

  private get templates() {
    return $templates.getState();
  }

  observeStore() {
    $templates.subscribe(() => {
      this.render();
    });
  }

  getUi() {
    return `
      <ul class="p-3 border rounded bg-black/80">
        ${this.templates.map(
          ({ label }) => `
            <li>${label}</li>
          `,
        )}
      </ul>
    `;
  }

  render() {
    this.shadow.innerHTML = this.getUi();
  }
}
