import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert";

const alert = new Alert("alerts.json");
alert.init();

loadHeaderFooter();
