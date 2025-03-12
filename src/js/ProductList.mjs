import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {

    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product-card__price" 
    style="color: ${(product.FinalPrice < product.SuggestedRetailPrice) ? 'Green' : 'inherit'};">
    ${(product.FinalPrice < product.SuggestedRetailPrice) ? "Discount" : ""}
    </p></a>
 </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        console.log(list);
        this.renderList(list);
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // console.log(htmlStrings[0]);
        // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}