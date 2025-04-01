import { loadHeaderFooter, alertMessage } from "./utils.mjs"; 
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const checkout = new CheckoutProcess("so-cart", ".products");
  checkout.init();

  document.querySelector("#checkout-form").addEventListener("submit", (event) => {
      event.preventDefault();
  
      const form = document.querySelector("#checkout-form");
      let errorMessages = [];
  
      // Collect all missing or invalid fields
      if (!form.fname.value.trim()) errorMessages.push("No First Name");
      if (!form.lname.value.trim()) errorMessages.push("No Last Name");
      if (!form.street.value.trim() || !form.city.value.trim() || !form.state.value.trim() || !form.zip.value.trim()) {
          errorMessages.push("Missing or incomplete address");
      }
      if (!form.cardNumber.value.trim()) errorMessages.push("No card number");
      if (!form.expiration.value.trim()) errorMessages.push("Missing card expiration");
      if (!form.code.value.trim()) errorMessages.push("Missing security code");
  
      // If there are errors, show them
      if (errorMessages.length > 0) {
          alertMessage(errorMessages);
          return; // Stop form submission
      }
  
      // Proceed with checkout if no errors
      myCheckout.checkout(form);
  });
  




});

loadHeaderFooter();
