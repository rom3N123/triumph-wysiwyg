import type { Observer } from "effector";
import {
  $templates,
  createTemplate,
  removeTemplateById,
  updateTemplateLabelById,
  type UpdateTemplateLabelPayload,
} from "../models/templates";

export class SelectTemplatesInput extends HTMLElement {
  static componentName = "select-templates-input";

  private shadow: ShadowRoot;
  private ref: HTMLSelectElement | null = null;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    this.render();
    this.createRef();

    this.observeStore();
  }

  private createRef() {
    this.ref = this.shadow.querySelector("select");
  }

  private get templates() {
    return $templates.getState();
  }

  private observeStore() {
    createTemplate.subscribe(() => {
      this.rerender();
    });

    updateTemplateLabelById.subscribe(
      ({ id, label }: UpdateTemplateLabelPayload) => {
        if (this.ref) {
          const optionToUpdate = this.ref.querySelector(`[data-id='${id}']`);

          if (optionToUpdate) {
            optionToUpdate.textContent = label;
            optionToUpdate.setAttribute("value", label);
          }
        }
      },
    );

    removeTemplateById.subscribe((templateId) => {
      if (this.ref) {
        const deletedOption = this.ref.querySelector(
          `[data-id='${templateId}']`,
        );

        const selectedValue = this.ref.value;

        const isDeletedWasActive =
          selectedValue === deletedOption?.getAttribute("value");

        if (isDeletedWasActive) {
          deletedOption.textContent = "ERROR";
          deletedOption.setAttribute("value", "ERROR");
        }
      }
    });
  }

  renderOptions() {
    return this.templates
      .map(
        ({ label, id }) => `<option value="${label}" data-id="${id}">
            ${label}
          </option>`,
      )
      .join("");
  }

  private rerender() {
    if (this.ref) {
      this.ref.innerHTML = this.renderOptions();
    }
  }

  getUi() {
    return `
      <select>
        ${this.renderOptions}
      </select>
    `;
  }

  render() {
    this.shadow.innerHTML = this.getUi();
  }
}
