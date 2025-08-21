import tinymce from "tinymce";

import "tinymce/icons/default/icons.min.js";

import "tinymce/themes/silver/theme.min.js";
import "tinymce/models/dom/model.min.js";

import "tinymce/skins/ui/oxide/skin.js";
import { SelectTemplatesInput } from "./views/select-templates-input";
import { $templates } from "./models/templates";
import { createWatch } from "effector";

const updateAllSelects = (doc: Document) => {
  const allSelects = doc.querySelectorAll("select");

  allSelects.forEach((select) => {
    select.innerHTML = new SelectTemplatesInput().renderOptions();
  });
};

createWatch({
  unit: $templates,
  fn: () => {
    const doc = tinymce.activeEditor?.getDoc();

    if (doc) {
      updateAllSelects(doc);
    }
  },
});

tinymce.PluginManager.add("dropdown", (editor) => {
  editor.ui.registry.addButton("dropdown", {
    text: "Insert",
    onAction: () => {
      // хотел бы я сделать так, только видимо редактор этого не умеет, поэтому пишу костыль
      // editor
      //   .insertContent
      //   '<select-templates-input></select-templates-input>'
      //   ();

      const select = new SelectTemplatesInput();
      const innerContent = select.shadowRoot?.innerHTML;

      if (innerContent) {
        editor.insertContent(innerContent || "");
      }
    },
  });
});

export function setupEditor() {
  tinymce.init({
    selector: "textarea#editor",
    license_key: "gpl",
    plugins: "dropdown",
    toolbar: "dropdown",
    resize: false,
    menubar: false,
  });
}
