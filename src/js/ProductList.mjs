import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let discountIndicator = "";
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        let priceA = (product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice;
        let discount = Math.round(priceA * 100);
        discountIndicator = `<span class="discount-indicator"> -${discount}%</span>`
    }

    return `
    <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
            <img 
            src="${product.Image ? product.Image : product.Images.PrimaryExtraLarge}" 
            alt="Image of ${product.Name}" 
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">
            $${product.FinalPrice} (${discountIndicator})</p>
        </a>
    </li>    
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        // const list = await this.dataSource.getData();
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }

    renderList(list) {

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}