import { TemplatesList } from "./views/templates-list";
import { ChangeTemplateInput } from "./views/change-template-input";
import { CreateTemplateButton } from "./views/create-template-button";
import { RemoveTemplateButton } from "./views/remove-template-button";

const components = [
  TemplatesList,
  ChangeTemplateInput,
  CreateTemplateButton,
  RemoveTemplateButton,
];

export const defineComponents = () => {
  components.forEach((component) => {
    customElements.define(component.componentName, component);
  });
};
