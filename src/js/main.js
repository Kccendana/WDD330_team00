import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert";


const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const list = new ProductList("Tents", dataSource, element);
list.init();

const alert = new Alert("alerts.json");
alert.init();

updateCartCount();
loadHeaderFooter();
