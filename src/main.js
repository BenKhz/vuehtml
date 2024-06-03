import grapesjs from "grapesjs";
import plugins from "./plugins";

function initializeGrapesJS() {
  window.editor = grapesjs.init({
    container: "#app",
    plugins: plugins,
    storageManager:false,
    canvas: { styles: ['./src/plugins/tabs/tabs.scss']},
  });
}

initializeGrapesJS();
