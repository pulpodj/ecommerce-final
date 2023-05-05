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
    const divCategory = document.getElementById(category);
    const divCatAll = document.querySelectorAll('.section-cards-title')
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

        if(isSelectCategory(category)){
            text = 'Categoria: Todos';
            category = 'Todos'
        };
             
        divCatAll.forEach((div)=>{
            div.classList.remove('select');
        })
        
        if(category != 'Todos'){
            btnCloseCategory.style.display = 'block';
            divCategory.classList.toggle('select');
           }
        else
            btnCloseCategory.style.display = 'none';
        cartCategory.innerHTML = `${text}`;
        
        filtrarProductos(category);
       

}

function isSelectCategory(category){
    
    const divSelect = document.querySelectorAll('.select')
    if(divSelect.length > 0)
    
       return(divSelect[0].id == category)
       
    
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

//Funcion para filtrar las cards de productos
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

//Funcion para filtrar las cards de productos si preciona enter en el input
function buscarProductosInput(evt){

    if (evt.keyCode !== 13) return;
    const text = evt.target.value.toLowerCase().trim();
    const productsFiltrados = productsLS.filter((product) => {
            const filtra = product.name.toLowerCase().includes(text.toLowerCase())
            return filtra
             });
    const cant = productsFiltrados.length;

    document.getElementById('products-search-count').innerText = 'Se encontraron ' + cant + ' productos';

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

function precargaUserAdmin(){
    const currentAdmin = localStorage.getItem('users') ;

    if(!currentAdmin)
       showQuestion('Desea cargar un Usuario Admin').then((result)=>{
        if(result){
        const newUser = {
            fullName: 'Admin',
            email: 'admin@gmail.com',
            password: 'alfabeta',
            date: '1990-01-01',
            country: 'AR',
            gender: 'masculino',
            role: 'ADMIN_ROLE'
        }
        const Usuarios = [];
        Usuarios.push(newUser);
        localStorage.setItem('users',JSON.stringify( Usuarios))
        precargaProductos()

        }
        else{
            precargaProductos()
        }
    })
    else
    precargaProductos()
} 

function precargaProductos(){
    const productosLS = localStorage.getItem('products') ;

    if(!productosLS)
    showQuestion('Desea cargar Productos de Ejemplo').then((result)=>{
        if(result){
        const Productos = [{category:"AG",
        date:"2023-05-02",
        description:" Herbicida no selectivo para el control postemergente de malezas anuales y perennes en áreas agrícolas, industriales, caminos, vías férreas, etc.  Este herbicida no deja residuos en el suelo y se inactiva al entrar en contacto con el mismo.",
        image:"https://ecommerce-nicolas-muller.netlify.app/assets/images/card/01-glifosato.webp",
        name:"Glifosato",
        price:24900},
        {category:"AG",
        date:"2023-05-02",
        description:" Herbicida que actúa en todos los tejidos vegetales verdes, y es particularmente activo contra gramíneas anuales y malezas de hoja ancha. Necesita de la fotosíntesis activa para manifiesta su efecto. En condiciones cálidas y soleadas, la actividad herbicida se desarrolla rápidamente en unas pocas horas.",
        image:"https://ecommerce-nicolas-muller.netlify.app/assets/images/card/02-%20paraquat.webp",
        name:"Paraquat",
        price:31100},
        {category:"AG",
        date:"2023-05-02",
        description:" Herbicida selectivo postemergente sistémico para el control de malezas gramíneas anuales y perennes. No controla malezas de hoja ancha ni ciperáceas.Es absorbido rápidamente por el follaje y se trasloca por floema y xilema.",
        image:"https://ecommerce-nicolas-muller.netlify.app/assets/images/card/03-%20Cletodim.webp",
        name:"Cletodim",
        price:5600},
        {category:"AG",
        date:"2023-05-02",
        description:"La urea es el fertilizante más utilizado. Es el sólido granulado de mayor concentración de nitrógeno (N). Es componente de vitaminas y de los sistemas de energía de la planta.Es necesario para la síntesis de la clorofila y como parte de la molécula de la clorofila.",
        image:"https://ecommerce-nicolas-muller.netlify.app/assets/images/card/04-%20Urea.webp",
        name:"Urea Granulada",
        price:3900},
        {category:"AG",
        date:"2023-05-02",
        description:"Estimulante y acondicionador del suelo. es un formulado a base de un complejo de aminoácidos libres de origen vegetal con un extracto orgánico de ácidos húmicos y fúlvicos, desarrollado como estimulante y acondicionador del suelo perteneciente a la familia de bionutrientes.",
        image:"https://ecommerce-nicolas-muller.netlify.app/assets/images/card/05-Solmix.webp",
        name:"Solmix",
        price:65900}
        ];
        localStorage.setItem('products',JSON.stringify( Productos));
        window.location.href = '/';
        }
    })
}

precargaUserAdmin()

