import { TemplatesList } from "./views/templates-list";
import { ChangeTemplateInput } from "./views/change-template-input";
import { CreateTemplateButton } from "./views/create-template-button";
import { RemoveTemplateButton } from "./views/remove-template-button";
import { SelectTemplatesInput } from "./views/select-templates-input";

const components = [
  TemplatesList,
  ChangeTemplateInput,
  CreateTemplateButton,
  RemoveTemplateButton,
  SelectTemplatesInput,
];

export const defineComponents = () => {
  components.forEach((component) => {
    customElements.define(component.componentName, component);
  });
};
