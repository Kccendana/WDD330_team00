import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".summary");
order.init();

document.querySelector(".close").addEventListener("click", () => {
  const errCon = document.querySelector(".errCon");
  errCon.style.display = "none";
})
// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  order.checkout();
});


  