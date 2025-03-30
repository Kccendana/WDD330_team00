import ProductData from "./ProductData.mjs";

// Initialize ProductData to fetch from JSON
const dataSource = new ProductData("tents");

// Handle search form submission
document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  if (!query) return;

  // Fetch products from the API
  const allProducts = await dataSource.getData();
  const filteredProducts = allProducts.filter((product) =>
    product.Name.toLowerCase().includes(query)
  );

  // Store search results in localStorage and redirect to results page
  localStorage.setItem("searchResults", JSON.stringify(filteredProducts));
  window.location.href = "../product_pages/index.html";
});
