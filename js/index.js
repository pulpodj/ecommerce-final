const cardContainer = document.getElementById('#card-container');
const productsLS = JSON.parse(localStorage.getItem('products')) || [];
const btnCloseCategory = document.getElementById("category-btn-close");

function renderizarProductos(products){

    cardContainer.innerHTML = ``;

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
        <div class="card__date-price">
            <div class="card__date">
                ${product.date}
            </div>
            <div class="card__price">
                $ ${product.price}
            </div>
        </div>
    </div>
    <div class="card__footer">
        <div class="card__btn-container">
            <a href="/pages/product-detail/product-detail.html?id=${index}" class="card__btn-detail" >
            Detalle
            </a>
        </div>  
        <div class="card__btn-container">
            <button onclick="agregarOrden(${index})" class="card__btn" >
                Agregar
            </button>
        </div>
    </div>`


    cardContainer.appendChild(card);

    });

}

renderizarProductos(productsLS);

// funcion para los botones de eleccion de categoria
function elegirCategoria(category){
    const cartCategory = document.getElementById('cards__category');
    let text;

    switch (category) {
        case "HA":
            text = 'Categoria: Consig. Hacienda';
            break;
        case "NA":
            text = 'Categoria: Nutrición Animal';
            break;
        case "AC":
            text = 'Categoria: Acopio de Granos';
            break;
        case "AG":
            text = 'Categoria: Agroinsumos';
            break;
        case "SE":
            text = 'Categoria: Semillero';
            break;
        case "CO":
            text = 'Categoria: Combustibles';
            break;  
        case "SG":
            text = 'Categoria: Seguros';
            break;  
        default:
            text = 'Categoria: Todos';
        }

        if(category != 'Todos')
            btnCloseCategory.style.display = 'block';
        else
        btnCloseCategory.style.display = 'none';
        cartCategory.innerHTML = `${text}`
        filtrarProductos(category)

}

btnCloseCategory.addEventListener('click',() => {
    elegirCategoria('Todos')

})

function agregarOrden(id){
    const product = productsLS[id];
        
    const newOrder = {
        image: product.image,
        name: product.name,
        price: product.price,
        cant: 1,
        total: product.price
        
    }
        
    const prod = Order.find((prod)=>{
        if(prod.name === product.name){
          prod.cant = parseInt(prod.cant) + 1 ;
          prod.total = prod.cant * parseInt(prod.price);
          return prod;
        }
      })
  
      if(!prod) {
        Order.push(newOrder);
      }

//Guardarlo en el local storage
localStorage.setItem('order',JSON.stringify( Order));

//Alerta de Producto agregado
showAlert('Producto agregado al carrito','exito')

contarProductos();

}

//Funcion para filtrar la table de usuario segun un texto pasado como parametro
function filtrarProductos(category){
        let productsFiltrados = [];
    if(category === 'Todos'){
        productsFiltrados = productsLS;
    }else{
        productsFiltrados = productsLS.filter((producto) => {
            const filtra = producto.category.includes(category)
            return filtra
             });
            }
renderizarProductos(productsFiltrados);

}

//Funcion para filtrar la table de usuario segun un texto pasado como parametro
function buscarProductos(){
    const text =  document.getElementById('products-search').value; 
    const productsFiltrados = productsLS.filter((product) => {
            const filtra = product.name.toLowerCase().includes(text.toLowerCase())
            return filtra
             });

const cant = productsFiltrados.length;

document.getElementById('products-search-count').innerText = 'Se encontraron ' + cant + ' productos';

renderizarProductos(productsFiltrados);

}