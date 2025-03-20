import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import Alert from "./Alert";

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);
list.init();

const alert = new Alert("alerts.json");
alert.init();

loadHeaderFooter();
