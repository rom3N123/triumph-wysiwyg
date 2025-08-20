import {
  updateTemplateLabelById,
  $selectedTemplateId,
  $selectedTemplateName,
} from "../models/templates";

export class ChangeTemplateInput extends HTMLElement {
  private shadow: ShadowRoot;
  static componentName = "change-template-input";
  private inputElementRef: HTMLInputElement | null = null;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    this.render();

    this.observeStore();

    this.createInputElementRef();
    this.addOnChangeListener();
  }

  private get selectedTemplateName() {
    return $selectedTemplateName.getState();
  }

  private get selectedTemplateId() {
    return $selectedTemplateId.getState();
  }

  private observeStore() {
    $selectedTemplateName.subscribe(() => {
      this.rerender();
    });
  }

  private createInputElementRef() {
    this.inputElementRef = this.shadow.querySelector("input");
  }

  // @ts-ignore
  private onChange({ currentTarget: { value } }: Event) {
    if (this.selectedTemplateId) {
      updateTemplateLabelById({
        id: this.selectedTemplateId,
        label: value,
      });
    }
  }

  private addOnChangeListener() {
    if (this.inputElementRef) {
      this.inputElementRef.addEventListener("input", this.onChange);
    }
  }

  private rerender() {
    if (this.inputElementRef) {
      this.inputElementRef.setAttribute("value", this.selectedTemplateName);
      this.inputElementRef.setAttribute(
        "disabled",
        `${Boolean(this.selectedTemplateId)}`,
      );
    }
  }

  getUi() {
    return `
      <input 
        placeholder="Enter template name.." 
        disabled
      />
    `;
  }

  render() {
    this.shadow.innerHTML = this.getUi();
  }
}
