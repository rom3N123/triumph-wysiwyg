import {
  updateTemplateLabelById,
  $selectedTemplateId,
  $selectedTemplateName,
} from "../models/templates";

export class ChangeTemplateInput extends HTMLElement {
  static componentName = "change-template-input";

  private shadow: ShadowRoot;
  private ref: HTMLInputElement | null = null;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    this.render();

    this.observeStore();

    this.createRef();
    this.addOnChangeListener();
  }

  private get selectedTemplateName() {
    return $selectedTemplateName.getState();
  }

  private observeStore() {
    $selectedTemplateName.subscribe(() => {
      this.rerender();
    });
  }

  private createRef() {
    this.ref = this.shadow.querySelector("input");
  }

  // @ts-ignore
  private onChange({ currentTarget: { value } }: Event) {
    const selectedTemplateId = $selectedTemplateId.getState();

    if (selectedTemplateId) {
      updateTemplateLabelById({
        id: selectedTemplateId,
        label: value,
      });
    }
  }

  private addOnChangeListener() {
    if (this.ref) {
      this.ref.addEventListener("input", this.onChange);
    }
  }

  private rerender() {
    if (this.ref) {
      this.ref.value = this.selectedTemplateName;

      const isActive = Boolean($selectedTemplateId.getState());

      isActive
        ? this.ref.removeAttribute("disabled")
        : this.ref.setAttribute("disabled", "true");
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

  private render() {
    this.shadow.innerHTML = this.getUi();
  }
}
