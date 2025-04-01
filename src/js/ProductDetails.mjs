import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

/*function productDetailsTemplate(product) {
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
} */

//image carousel
    function productDetailsTemplate(product) {
        let discountIndicator = "";
        if (product.FinalPrice < product.SuggestedRetailPrice) {
            let discount = Math.round((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice * 100);
            discountIndicator = `<span class="discount-indicator"> -${discount}%</span>`;
        }
    
        // Generate the main image + thumbnails if extra images exist
        let thumbnails = `
            <img class="thumbnail active" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" onclick="changeImage(this)">
        `;
        
        if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
            product.Images.ExtraImages.forEach(img => {
                thumbnails += `
                    <img class="thumbnail" src="${img.Src}" alt="Alternate view of ${product.NameWithoutBrand}" onclick="changeImage(this)">
                `;
            });
        }
    
        return `
        <section class="product-detail">
            <h3>${product.Brand.Name}</h3>
            <h2 class="divider">${product.NameWithoutBrand}</h2>
            
            <!-- Image Display -->
            <div class="image-gallery">
                <img id="mainImage" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}">
                <div class="thumbnails">
                    ${thumbnails}
                </div>
            </div>
    
            <p class="product-card__price">$${product.FinalPrice} (${discountIndicator})</p>
            <p class="product__color">${product.Colors[0].ColorName}</p>
            <p class="product__description">${product.DescriptionHtmlSimple}</p>
            
            <div class="product-detail__add">
                <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
            </div>
        </section>`;
    }
    


    window.changeImage = function(thumbnail) {
        document.getElementById("mainImage").src = thumbnail.src;
    
        // Highlight the active thumbnail
        document.querySelectorAll(".thumbnail").forEach(img => img.classList.remove("active"));
        thumbnail.classList.add("active");
    }; //end image carousel



export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");
    
        // Ensure event listener is added after rendering
        setTimeout(() => {
            const addToCartBtn = document.getElementById("addToCart");
            if (addToCartBtn) {
                addToCartBtn.addEventListener("click", () => {
                    this.addToCart();
                    updateCartCount();
                });
            }
        }, 100);
    }
    

    addToCart() {
        let cart = getLocalStorage("so-cart");
    
        // Ensure cart is always an array
        if (!Array.isArray(cart)) {
            cart = [];
        }
    
        let item = cart.find(item => item.Id === this.product.Id);
    
        if (item) {
            item.quantity = (item.quantity || 0) + 1;
        } else {
            cart.push({ ...this.product, quantity: 1 });
        }
    
        setLocalStorage("so-cart", cart);
        updateCartCount();
        
        console.log("Cart after adding:", getLocalStorage("so-cart")); // Debugging
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
