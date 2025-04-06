import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);
list.init();


document.getElementById("sort-by").addEventListener("change", (event) => {
    list.sortProducts(event.target.value);
  });