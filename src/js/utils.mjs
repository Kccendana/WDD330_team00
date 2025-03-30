// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

/*export function getItemsFromLocalStorage(){
  return getLocalStorage("so-cart") || [];
} */
export function getItemsFromLocalStorage() {
  const items = getLocalStorage("so-cart");
  return Array.isArray(items) ? items : [];
}

function itemsCount() {
  const items = getItemsFromLocalStorage()
  return items.reduce((total, item) => total + (item.quantity || 1), 0);
}

export function updateCartCount(){
  const count =itemsCount();
  const countElement = document.querySelector(".item-count");
  if (countElement){
    if (count === 0){
    countElement.style.display = 'none';
  } else{
    countElement.style.display = 'block';
    countElement.textContent = count;
  } 
  }
}
  
export function renderListWithTemplate(templateFn, parentElement, list, position="afterbegin", clear = false) {
  const filterList = list.filter(item => item.clear !== true);
  const htmlString = filterList.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter(){
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#footer");
  renderWithTemplate(footerTemplate, footerElement);
  updateCartCount();
}
