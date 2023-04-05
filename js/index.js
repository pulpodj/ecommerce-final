
const cardContainer = document.querySelector('#card-container')

const productsLS = JSON.parse(localStorage.getItem('products')) || [];

function renderizarProductos(products){

    cardContainer.innerHTML = '';

    products.forEach((product,index )=> {
        

        const card = document.createElement('article');
        card.classList.add('card');

        card.innerHTML = `<div class="card__header">
        <img src="${product.image}" alt="${product.name}" class="card__image">
    </div>
    <div class="card__body">
        <div class="card__title">
        ${product.name}
        </div>
        <p class="card__description">
        ${product.description}    
        </p>
        <div class="card__price">
            $ ${product.price}
        </div>
    </div>
    <div class="card__footer">
        <div class="card__date">
            13/12/2022
        </div>
        <div class="card__btn-container">
            <a href="#" class="card__btn" herf="/pages/product-detail/products-detail.html?=${index}">
                Detalle
            </a>
        </div>
    </div>`


    cardContainer.appendChild(card);
    });

}

renderizarProductos(productsLS);