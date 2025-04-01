import { getLocalStorage, alertMessage } from "./utils.mjs"; 
import { convertToJson } from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(cartKey, outputSelector) {
    this.cartKey = cartKey;
    this.outputSelector = outputSelector;
    this.cartItems = [];
    this.itemTotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }

  init() {
    this.cartItems = getLocalStorage(this.cartKey) || [];
    this.calculateOrderSummary();
    this.displayCartItems();
  }

  calculateOrderSummary() {
    this.totalItems = this.cartItems.length;
    this.itemTotal = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice * (item.quantity || 1)), 0);
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.cartItems.length > 0 ? 10 + (this.cartItems.length - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.updateOrderSummary();
  }

  updateOrderSummary() {
    // Ensure elements exist before updating
    const totalItemsElem = document.querySelector(`${this.outputSelector} #totalitems`);
    const subtotalElem = document.querySelector(`${this.outputSelector} #subtotal`);
    const taxElem = document.querySelector(`${this.outputSelector} #tax`);
    const shippingElem = document.querySelector(`${this.outputSelector} #shipping`);
    const totalElem = document.querySelector(`${this.outputSelector} #total`);

    if (totalItemsElem) totalItemsElem.textContent = `${this.totalItems}`;
    if (subtotalElem) subtotalElem.textContent = `$${this.itemTotal.toFixed(2)}`;
    if (taxElem) taxElem.textContent = `$${this.tax.toFixed(2)}`;
    if (shippingElem) shippingElem.textContent = `$${this.shipping.toFixed(2)}`;
    if (totalElem) totalElem.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  displayCartItems() {
    const cartList = document.querySelector(`${this.outputSelector} #checkout-items`);
    if (!cartList) return;

    cartList.innerHTML = "";

    if (this.cartItems.length === 0) {
      cartList.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    this.cartItems.forEach(item => {
      const listItem = document.createElement("li");
      listItem.classList.add("cart-item");
      listItem.innerHTML = `
        <img src="${item.Images.PrimarySmall}" alt="${item.Name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.Name}</h4>
          <p>Quantity: ${item.quantity || 1}</p>
          <p>Price: $${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
        </div>
      `;
      cartList.appendChild(listItem);
    });
  }

  packageItems() {
    return this.cartItems.map(item => ({
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity || 1
    }));
  }

  async checkout(form) {
    try {
        const formData = new FormData(form);
        const order = Object.fromEntries(formData.entries());

        order.orderDate = new Date().toISOString();
        order.items = this.packageItems();
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping.toFixed(2);

        console.log("Submitting Order:", order); // Debugging

        const response = await fetch("https://wdd330-backend.onrender.com/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });

        const result = await convertToJson(response); // Use improved convertToJson
        console.log("Order successful:", result);

        // ✅ SUCCESS: Redirect to success page & clear cart
        localStorage.removeItem("so-cart");
        window.location.href = "/checkout/success.html";

    } catch (err) {
        console.error("Checkout error:", err);
        alertMessage(`Checkout Failed: ${err.message}`, true);
    }
}
}
