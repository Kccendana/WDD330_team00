import { getLocalStorage } from "./utils.mjs";

export function superscripts() {
  const cart = document.querySelector(".cart");
  const superscript = document.createElement("span");
  superscript.className = "superscript";
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length > 0) {
    superscript.innerText = cartItems.length;
    cart.append(superscript);
  } else {
    superscript.style.display = "none";
    cart.append(superscript);
  }
}
