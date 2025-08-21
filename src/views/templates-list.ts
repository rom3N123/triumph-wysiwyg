import { combine } from "effector";
import {
  $selectedTemplateId,
  $templates,
  selectTemplateById,
} from "../models/templates";

export class TemplatesList extends HTMLElement {
  static componentName = "templates-list";

  private shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    this.render();
    this.addListItemClickListeners();

    this.observeStore();
  }

  private get templates() {
    return $templates.getState();
  }

  private get selectedItemId() {
    return $selectedTemplateId.getState();
  }

  private observeStore() {
    combine($templates, $selectedTemplateId).subscribe(() => this.rerender());
  }

  private onItemClick({ target }: Event) {
    if (target instanceof Element) {
      const itemId = Number(target.id);
      const isActive = itemId === $selectedTemplateId.getState();

      selectTemplateById(isActive ? null : itemId);
    }
  }

  private addListItemClickListeners() {
    const listItems = this.shadow.querySelectorAll("li");

    listItems.forEach((item) => {
      item.addEventListener("click", this.onItemClick);
    });
  }

  private removeEventListeners() {
    const listItems = this.shadow.querySelectorAll("li");

    listItems.forEach((item) => {
      item.removeEventListener("click", this.onItemClick);
    });
  }

  private rerender() {
    this.removeEventListeners();
    this.render();
    this.addListItemClickListeners();
  }

  getUi() {
    return `
      <style>
        .active-item {
          background-color: green;
        }
      </style>

      <ul class="p-3 border rounded bg-black/80">
        ${this.templates
          .map(({ label, id }) => {
            const isActive = id === this.selectedItemId;

            return `
              <li class="${isActive && "active-item"}" id="${id}">${label}</li>
            `;
          })
          .join("")}
      </ul>
    `;
  }

  private render() {
    this.shadow.innerHTML = this.getUi();
  }
}
