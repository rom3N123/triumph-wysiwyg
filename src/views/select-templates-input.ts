import { createWatch } from "effector";
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

  private rerenderOption({ id, label }: UpdateTemplateLabelPayload) {
    if (this.ref) {
      const optionToUpdate = this.ref.querySelector(`[data-id='${id}']`);

      if (optionToUpdate) {
        optionToUpdate.textContent = label;
        optionToUpdate.setAttribute("value", label);
      }
    }
  }

  private addErrorLabelToTheOption(templateId: number) {
    if (this.ref) {
      const deletedOption = this.ref.querySelector(`[data-id='${templateId}']`);

      const selectedValue = this.ref.value;

      const isDeletedWasActive =
        selectedValue === deletedOption?.getAttribute("value");

      if (isDeletedWasActive) {
        deletedOption.textContent = "ERROR";
        deletedOption.setAttribute("value", "ERROR");
      }
    }
  }

  private observeStore() {
    createWatch({
      unit: createTemplate,
      fn: () => this.rerender(),
    });

    createWatch({
      unit: updateTemplateLabelById,
      fn: (payload) => this.rerenderOption(payload),
    });

    createWatch({
      unit: removeTemplateById,
      fn: (templateId) => this.addErrorLabelToTheOption(templateId),
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
      </select>
    `;
  }

  render() {
    this.shadow.innerHTML = this.getUi();
  }
}
