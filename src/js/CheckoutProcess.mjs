import {getLocalStorage} from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.numItems = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      // calculate and display the total dollar amount of the items in the cart, and the number of items.
      const summaryElement = document.querySelector(
        this.outputSelector + " #cartTotal");
      const itemNumElement = document.querySelector(
        this.outputSelector + " #num-items");
        this.numItems = list.reduce((total, item) => total + (item.quantity || 1), 0);
      itemNumElement.innerText = numItems;
      // calculate the total of all the items in the cart
      const amounts = this.list.map((item) => item.FinalPrice * item.quantity);
      this.itemTotal = amounts.reduce((sum, item) => sum + item);

      summaryElement.innerText = `$${this.itemTotal}`;;
    }
  
    calculateOrderTotal() {
      // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
      this.tax = (this.itemTotal * 0.06)
      this.shipping = 10 + (this.numItems - 1) * 2;
      this.orderTotal = (parseFloat(this.tax) + parseFloat(this.shipping) + parseFloat(this.itemTotal))
  
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const tax = document.querySelector(`${this.outputSelector} #tax`);
      const shipping = document.querySelector(`${this.outputSelector} #shipping`);
      const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);
  
      tax.innerText = `$${this.tax.toFixed(2)}`;
      shipping.innerText = `$${this.shipping.toFixed(2)}`;
      orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }
  }