import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
    let discountIndicator = "";
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        let priceA = (product.SuggestedRetailPrice - product.FinalPrice)/product.SuggestedRetailPrice;
        let discount = Math.round(priceA * 100);
        discountIndicator = `<span class="discount-indicator"> -${discount}%</span>`
    }

    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice} (${discountIndicator})</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init() {
        // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // once we have the product details we can render out the HTML
        this.renderProductDetails("main");
        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document
            .getElementById("addToCart")
            .addEventListener("click", () => {
             this.addToCart();
             updateCartCount();
            });
    }
    addToCart() {
        let cart = getLocalStorage("so-cart") || [];
        let item = cart.find(item => item.Id === this.product.Id);
    
        if (item) {
            item.quantity = (item.quantity || 1) + 1;
        } else {
            cart.push({ ...this.product, quantity: 1 });
        }
    
        setLocalStorage("so-cart", cart);
        alert("Added to Cart");
    }
      
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML(
            "afterBegin",
            productDetailsTemplate(this.product)
        );
    }
}