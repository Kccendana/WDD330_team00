import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  loadHeaderFooter,
  getItemsFromLocalStorage,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addTotal();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="../product_pages/index.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="quantity-container">
    <div class="decrement" data-id="${item.Id}">-</div>
    <span class="cart-card__quantity">${item.quantity}</span>
    <div class="increment" data-id="${item.Id}">+</div></div>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove-item" data-id="${item.Id}">X</button>
  </li>`;

  return newItem;
}

function addTotal() {
  const items = getItemsFromLocalStorage();

  const footer = document.querySelector(".cart-footer");
  if (items && items.length > 0) {
    footer.classList.remove("hide");

    const total = items.reduce(
      (sum, item) => sum + item.FinalPrice * item.quantity,
      0,
    );
    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;
  } else {
    footer.classList.add("hide");
  }
}

function removeItem(itemId) {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems) {
    cartItems = cartItems.filter((item) => item.Id !== itemId);
    setLocalStorage("so-cart", cartItems);
    renderCartContents();
    removeListeners();
    updateCartCount();
  }
}

function removeListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.id;
      removeItem(itemId);
    });
  });
}

function incrementQuantity(id) {
  const items = getItemsFromLocalStorage();
  const index = items.findIndex((item) => item.Id === id);

  if (index !== -1) {
    items[index].quantity += 1; // Increase quantity
    setLocalStorage("so-cart", items); // Update local storage
    renderCartContents();
    updateCartCount();
  }
}

function decrementQuantity(id) {
  const items = getItemsFromLocalStorage();
  const index = items.findIndex((item) => item.Id === id);

  if (index !== -1) {
    if (items[index].quantity === 1) {
      removeItem(id);
    } else {
      items[index].quantity -= 1; // Increase quantity
      setLocalStorage("so-cart", items); // Update local storage
      renderCartContents();
      updateCartCount();
    }
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("increment")) {
    const itemId = event.target.dataset.id;
    console.log("Increment clicked:", itemId);
    incrementQuantity(itemId);
  }
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("decrement")) {
    const itemId = event.target.dataset.id;
    console.log("Decrement clicked:", itemId);
    decrementQuantity(itemId);
  }
});

renderCartContents();
removeListeners();
loadHeaderFooter();
