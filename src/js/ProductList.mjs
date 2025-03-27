import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let discountIndicator = "";
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        let priceA = (product.SuggestedRetailPrice - product.FinalPrice)/product.SuggestedRetailPrice;
        let discount = Math.round(priceA * 100);
        discountIndicator = `<span class="discount-indicator"> -${discount}% Off</span>`
    }

    return `
    <li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
            <img 
            src="${product.Images.PrimaryMedium}" 
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
        this.products = [];
    }

    async init() {
        this.products = await this.dataSource.getData(this.category); // Fix syntax error
        this.renderList(this.products); // Fix incorrect variable name
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
        this.listElement.innerHTML = "";
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    sortProducts(sortBy) {
        let sortedProd = [...this.products];

        switch (sortBy) {
            case "price-asc":
                sortedProd.sort((a, b) => a.FinalPrice - b.FinalPrice);
                break;
            case "price-desc":
                sortedProd.sort((a, b) => b.FinalPrice - a.FinalPrice);
                break;
            case "name-asc":
                sortedProd.sort((a, b) => a.Name.localeCompare(b.Name));
                break;
            case "name-desc":
                sortedProd.sort((a, b) => b.Name.localeCompare(a.Name));
                break;
            default:
                break;
        }

        this.renderList(sortedProd);
        console.log("Sorted products:", sortedProd);
        console.log("renderList called");
    }
}