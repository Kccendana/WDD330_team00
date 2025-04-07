import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("register-modal");
  const closeButton = modal.querySelector(".close-button");

  // Check if visitor has seen the modal
  const hasVisited = localStorage.getItem("hasVisited");

  if (!hasVisited) {
    modal.classList.remove("hidden"); // Show modal
    localStorage.setItem("hasVisited", "true"); // Set flag in localStorage
  }

  // Close modal on click
  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
});
