import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
console.log(dataSource);
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();
