<<<<<<< HEAD
import { setLocalStorage, getLocalStorage } from "./utils.mjs";
=======
import { getParam } from "./utils.mjs";
>>>>>>> a96f5cd (W02 Team Activity: Dynamic Product Detail Page with corrected addToCart() method in ProductDetails.mjs)
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
console.log(productId);
console.log(dataSource.findProductById(productId));

<<<<<<< HEAD
function addProductToCart(product) {
  let array = getLocalStorage("so-cart") || [];
  array.push(product);

  setLocalStorage("so-cart", array);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
=======
const product = new ProductDetails(productId, dataSource);
product.init();
>>>>>>> a96f5cd (W02 Team Activity: Dynamic Product Detail Page with corrected addToCart() method in ProductDetails.mjs)
