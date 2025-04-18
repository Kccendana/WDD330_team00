import {getLocalStorage} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function errorTemplate(errMessage){
  return `<li class="errMessage">${errMessage}</li>`
}

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  console.log(convertedJSON);
  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

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
      this.calculateOrderTotal();
    }
  
    calculateItemSummary() {
      // calculate and display the total dollar amount of the items in the cart, and the number of items.
      const summaryElement = document.querySelector(
        this.outputSelector + " #cartTotal");
      const itemNumElement = document.querySelector(
        this.outputSelector + " #num-items");
        this.numItems = this.list.reduce((total, item) => total + (item.quantity || 1), 0);
      itemNumElement.innerText = this.numItems;
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
    displayErrors(error){
      const showError = document.querySelector(".errCon");
      const errList = document.querySelector(".error")

      showError.style.display = "block";
      const errorMessage = Object.values(error).map((value) => 
        errorTemplate(value));
      errList.innerHTML = errorMessage.join("");
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
    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);
    
        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order);
    
        try {
          const response = await services.checkout(order);
          console.log(response);
        } catch (err) {
          console.log('Checkout failed:', err);

          // Ensure error message is an object
          if (err.message && typeof err.message === 'object') {
            this.displayErrors(err.message);
          } else {
            alert(`Error: ${err.message}`);
          }
        }
      }
  }