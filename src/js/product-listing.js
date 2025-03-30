import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);

myList.init();

// Update the page title with the selected category
document.querySelector('h1').textContent = `Top Products: ${category}`;


document.getElementById("sort-by").addEventListener("change", (event) => {
    list.sortProducts(event.target.value);
  });