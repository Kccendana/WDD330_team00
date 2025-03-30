import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let discountIndicator = "";
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        let priceA = (product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice;
        let discount = Math.round(priceA * 100);
        discountIndicator = `<span class="discount-indicator"> -${discount}% Off</span>`;
    }

    return `
    <li class="product-card">
        <a href="../product_pages/index.html?product=${product.Id}">
            <img 
                src="${product.Images?.PrimaryMedium || 'placeholder.jpg'}" 
                alt="Image of ${product.Name}" 
            />
            <h3 class="card__brand">${product.Brand?.Name || 'Unknown Brand'}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">$${product.FinalPrice} ${discountIndicator}</p>
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
    }

    sortProducts(sortBy) {
        const sortedProd = [...this.products];
        const [key, order] = sortBy.split("-");
        const isAscending = order === "asc" ? 1 : -1;

        sortedProd.sort((a, b) => {
            if (key === "price") return isAscending * (a.FinalPrice - b.FinalPrice);
            if (key === "name") return isAscending * a.Name.localeCompare(b.Name);
            return 0;
        });

        this.renderList(sortedProd); // Automatically update the UI with sorted data
    }
}
