import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./utils.mjs";

// const productData = new ProductData("tents");
const element = document.querySelector(".product-list");
const dataSource = new ProductData("tents");
const tentProductList = new ProductList("tents", dataSource, element);

tentProductList.init();
updateCartCount();
