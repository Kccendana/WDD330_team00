import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

// Image carousel
function productDetailsTemplate(product) {
    let discountIndicator = "";
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        let discount = Math.round(
            ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
        );
        discountIndicator = `<span class="discount-indicator"> -${discount}%</span>`;
    }

    // Generate the main image + thumbnails if extra images exist
    let thumbnails = `
        <img class="thumbnail active" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" onclick="changeImage(this)">
    `;

    if (product.Images.ExtraImages && product.Images.ExtraImages.length > 0) {
        product.Images.ExtraImages.forEach((img) => {
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

        <p class="product-card__price">$${product.FinalPrice} ${discountIndicator}</p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">${product.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>

        <!-- Comment Form -->
        <hr>
        <p>Custumer comments</p>
        <form id="commentForm" class="OA-comment-form">
            <input type="text" id="fullname" placeholder="Full Name" required />
            <input type="email" id="email" placeholder="Email" required />
            <input type="tel" id="phone" placeholder="Phone" required />
            <textarea id="commentText" placeholder="Your comment" required></textarea>
            <button type="submit">Submit</button>
        </form>

        <div id="comments-section" class="OA-comments-section"></div>
    </section>`;
}

window.changeImage = function (thumbnail) {
    document.getElementById("mainImage").src = thumbnail.src;

    // Highlight the active thumbnail
    document.querySelectorAll(".thumbnail").forEach((img) => img.classList.remove("active"));
    thumbnail.classList.add("active");
};

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails("main");

        setTimeout(() => {
            // Add to Cart Button
            const addToCartBtn = document.getElementById("addToCart");
            if (addToCartBtn) {
                addToCartBtn.addEventListener("click", () => {
                    this.addToCart();
                    updateCartCount();
                });
            }

            // Add Comment Form Event Listener
            const commentForm = document.getElementById("commentForm");
            if (commentForm) {
                commentForm.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const commentData = {
                        fullname: document.getElementById("fullname").value,
                        email: document.getElementById("email").value,
                        phone: document.getElementById("phone").value,
                        comment: document.getElementById("commentText").value, // Fix incorrect ID
                        timestamp: new Date().toISOString(),
                    };

                    await addComment(this.productId, commentData);
                    commentForm.reset();
                    renderComments(this.productId);
                });
            } else {
                console.error("commentForm not found!");
            }

            // Load comments when the product page loads
            renderComments(this.productId);
        }, 100); // Delay to ensure elements are loaded
    }

    addToCart() {
        let cart = getLocalStorage("so-cart");

        // Ensure cart is always an array
        if (!Array.isArray(cart)) {
            cart = [];
        }

        let item = cart.find((item) => item.Id === this.product.Id);

        if (item) {
            item.quantity = (item.quantity || 0) + 1;
        } else {
            cart.push({ ...this.product, quantity: 1 });
        }

        setLocalStorage("so-cart", cart);
        updateCartCount();

        console.log("Cart after adding:", getLocalStorage("so-cart")); // Debugging
        alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
    }
}

function alertMessage(message, type = "success") {
    alert(`${type.toUpperCase()}: ${message}`);
}

// Function to add a comment to the server
async function addComment(productId, commentData) {
    try {
        const response = await fetch(`http://localhost:3000/comments/${productId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(commentData),
        });

        if (!response.ok) throw new Error("Failed to add comment");

        console.log("Comment added successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to fetch and render comments
async function renderComments(productId) {
    const commentsSection = document.getElementById("comments-section");
    commentsSection.innerHTML = "<p>Loading comments...</p>";

    try {
        const response = await fetch(`http://localhost:3000/comments/${productId}`);
        const comments = await response.json();

        if (comments.length === 0) {
            commentsSection.innerHTML = "<p>No comments yet. Be the first to comment!</p>";
            return;
        }

        commentsSection.innerHTML = comments
            .map(
                (comment) => `
                <div class="comment OA-comment">
                    <h4 class="OA-comment-author">${comment.fullname}</h4>
                    <p class="OA-comment-text">${comment.comment}</p>
                    <small class="OA-comment-time">${new Date(comment.timestamp).toLocaleString()}</small>
                </div>
            `
            )
            .join("");
    } catch (error) {
        commentsSection.innerHTML = "<p>Error loading comments</p>";
        console.error("Error:", error);
    }
}
