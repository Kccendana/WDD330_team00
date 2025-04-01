import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const checkout = new CheckoutProcess("so-cart", ".products");
  checkout.init();
});
//const checkout = new CheckoutProcess("so-cart", "#order-summary");

document.addEventListener("DOMContentLoaded", () => {
  checkout.init();
  checkout.calculateOrderTotal();

  document.querySelector("#checkout-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const response = await checkout.checkout(event.target);
      console.log("Order successful:", response);
      alert("Order placed successfully!");
      localStorage.removeItem("so-cart");
      window.location.href = "/order-confirmation.html";
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was a problem with your order. Please try again.");
    }
  });
});


loadHeaderFooter();