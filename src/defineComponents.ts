import { TemplatesList } from "./views/templates-list";
import { ChangeTemplateInput } from "./views/change-template-input";

const components = [TemplatesList, ChangeTemplateInput];

export const defineComponents = () => {
  components.forEach((component) => {
    customElements.define(component.componentName, component);
  });
};
