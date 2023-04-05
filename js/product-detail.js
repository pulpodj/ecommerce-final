const params = window.location.search;

const index = params.split('id=')[1];

const paramsURL = new URLSearchParams(params);

const paramsEntries = Object.fromEntries(paramsURL);

const products = JSON.parse(localStorage.getItem('products'));

const product = products[id];

document.body.innerText = `<p>${JSON.stringify(product)}</p>`;

