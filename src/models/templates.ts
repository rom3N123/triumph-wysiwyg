import { combine, createEvent, createStore } from "effector";

export type Template = {
  id: number;
  label: string;
};

export type UpdateTemplateLabelPayload = Pick<Template, "id" | "label">;

export type SelectedTemplateId = Template["id"] | null;

export const $templates = createStore<Template[]>([]);
export const $selectedTemplateId = createStore<SelectedTemplateId>(null);
export const $selectedTemplateName = combine(
  $templates,
  $selectedTemplateId,
  (templates, selectedTemplateId) =>
    templates.find(({ id }) => id === selectedTemplateId)?.label || "",
);

export const createTemplate = createEvent();
export const removeTemplateById = createEvent<Template["id"]>();
export const selectTemplateById = createEvent<SelectedTemplateId>();
export const updateTemplateLabelById =
  createEvent<UpdateTemplateLabelPayload>();

$templates
  .on(createTemplate, (templates) => [
    ...templates,
    { id: Date.now(), label: "template" },
  ])
  .on(removeTemplateById, (templates, idToDelete) =>
    templates.filter(({ id }) => id !== idToDelete),
  )
  .on(updateTemplateLabelById, (templates, { id, label }) => {
    const templateIndexToUpdate = templates.findIndex(
      (template) => template.id === id,
    );

    if (templateIndexToUpdate === -1) {
      return templates;
    }

    const newTemplatesRef = [...templates];

    const templateToUpdate = newTemplatesRef[templateIndexToUpdate];
    const updatedTemplate = { ...templateToUpdate, label };

    newTemplatesRef[templateIndexToUpdate] = updatedTemplate;

    return newTemplatesRef;
  });

$selectedTemplateId
  .on(selectTemplateById, (_, selectedTemplateId) => selectedTemplateId)
  .on(removeTemplateById, (selectedId, removedId) =>
    selectedId === removedId ? null : selectedId,
  );
