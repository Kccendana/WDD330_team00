import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const list = new ProductList("Tents", dataSource, element);
list.init();
