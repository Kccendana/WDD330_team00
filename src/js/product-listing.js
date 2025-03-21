import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const title = document.querySelector(".product-categoryTitle");
title.innerHTML = category.charAt(0).toUpperCase()
+ category.slice(1)
const list = new ProductList(category, dataSource, element);
list.init();


