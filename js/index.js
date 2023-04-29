const cardContainer = document.getElementById('#card-container');
const productsLS = JSON.parse(localStorage.getItem('products')) || [];
//let orderLS = JSON.parse(localStorage.getItem('order')) || [];


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

    switch (category) {
        case "HA":
            cartCategory.innerText = 'Categoria: Consignación de Hacienda';
            break;
        case "NA":
            cartCategory.innerText = 'Categoria: Nutrición Animal';
            break;
        case "AC":
            cartCategory.innerText = 'Categoria: Acopio de Granos';
            break;
        case "AG":
            cartCategory.innerText = 'Categoria: Agroinsumos';
            break;
        case "SE":
            cartCategory.innerText = 'Categoria: Semillero';
            break;
        case "CO":
            cartCategory.innerText = 'Categoria: Combustibles';
            break;  
        case "SG":
            cartCategory.innerText = 'Categoria: Seguros';
            break;  
        default:
            cartCategory.innerText = 'Categoria: Todos';
        }

        filtrarProductos(category)

}



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
     
    const productsFiltrados = productsLS.filter((producto) => {
            const filtra = producto.category.includes(category)
            return filtra
             });

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

// if(!cant){
//   Users = JSON.parse(localStorage.getItem('users')) || [];
//   cargarTabla();
//   Swal.fire('No hubo coincidencias')
// }else{
//   Users = usersFiltrados;             
//   cargarTabla();
//   Users = JSON.parse(localStorage.getItem('users')) || [];
// }


}