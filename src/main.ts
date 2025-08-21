import "./style.css";
import { defineComponents } from "./defineComponents";
import "@tinymce/tinymce-webcomponent";
import { setupEditor } from "./setupEditor";

defineComponents();
setupEditor();
