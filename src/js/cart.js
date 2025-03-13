
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addTotal();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-item" data-id="${item.Id}">X</button>
</li>
`;

  return newItem;
}

function addTotal() {
  const items = getLocalStorage("so-cart");

  const footer = document.querySelector(".cart-footer");
  if (items && items.length > 0) {
    footer.classList.remove("hide");

    const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);
    document.querySelector(".cart-total").textContent = `Total: $${total.toFixed(2)}`;
  }
  else {
    footer.classList.add("hide");
  }

}

function removeItem(itemId) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    cartItems = cartItems.filter((item) => item.Id !== itemId);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
  }
}

function setupRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.id;
      removeItem(itemId);
    });
  });
}

renderCartContents();
setupRemoveListeners();
