import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const list = new ProductList(category, dataSource, element);
list.init();

document.getElementById("sort-by").addEventListener("change", (event) => {
  list.sortProducts(event.target.value);
});

// eslint-disable-next-line no-unused-vars
const search = () => {
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const storeitems = document.getElementById("product-list");
  const product = document.querySelectorAll("product");
  const pname = storeitems.getElementsByTagName("h2");

  for (var i = 0; i < pname.length; i++) {
    let match = product[i].getElementsByTagName("h2")[0];

    if (match) {
      let textvalue = match.textContent || match.innerHTML;
      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        product[1].computedStyleMap.display = "";
      } else {
        product[1].computedStyleMap.display = "none";
      }
    }
  }
};
