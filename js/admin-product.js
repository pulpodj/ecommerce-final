
let Products = JSON.parse(localStorage.getItem('products')) || [];

let favorites = [];

//Cargar fecha actual al input Date
function cargarFechaActual(){
    var fecha = new Date();
    document.getElementById("bornDateInput").value = fecha.toJSON().slice(0,10);
}
cargarFechaActual();

//Tabla de productos
const tableBody = document.getElementById('admin-product-table_body');
const submitBtn = document.getElementById('admin-product__submit-btn');
const productForm = document.getElementById('admin-product-form');

let editIndex;

function renderizarTabla(){
    tableBody.innerHTML = ''
    if(Products.length === 0) {
        tableBody.innerHTML = '<tr class="disable"> <td coldspan = 6>NO SE ENCONTRARON PRODUCTOS </td></tr>';
        return;
    }
    Products.forEach((producto,index)=>{
        let imageSrc = '/assest/image/no-product.png';
       if(producto.image) 
            imageSrc  = producto.image;
       const tableRow = `
       <tr>
                <td><img class= "admin-product__img" src="${imageSrc}" alt="${producto.name}" width="80px"></td>
                <td>${producto.name}</td>
                <td class="admin-product__desc">${producto.description}</td>
                <td class="admin-product__price">$ ${producto.price}</td>
                <td class="admin-product__date">${producto.date}</td>
                <td >
                <div class = "admin-product__actions">
                <button class= "admin-product__delete-btn" onclick= "deleteProduct(${index})" >
                <i class="fa-regular fa-trash-can"></i>
                </button>
                <button class= "admin-product__btn-edit" data-indice="${index}" onclick= "editProduct(${index})" >
                <i class="fa-solid fa-pencil"></i>
                </div>
                </button>
                </td>
            </tr>
       ` 
       tableBody.innerHTML += tableRow; 
    })
}

renderizarTabla();

function addProduct(evt){
    evt.preventDefault();
    const elements = evt.target.elements;
    
    const newProducts = {
        name: elements.name.value,
        category: elements.category.value,
        description: elements.description.value,
        price: elements.price.valueAsNumber,
        image: elements.image.value,
        date: elements.date.value,
    }
        
if (editIndex >= 0) {
    Products[editIndex] = newProducts;
}else {
    Products.push(newProducts);
}

//Guardarlo en el local storage
localStorage.setItem('products',JSON.stringify( Products));

editIndex = undefined;
submitBtn.classList.remove('edit-btn');
submitBtn.innerText = 'Cargar Producto'

renderizarTabla();
showAlert('Producto añadido Correctamente','exito')
}

function deleteProduct(id){
    showQuestion('¿Esta seguro que desea borrar el producto seleccionado?')
      .then((result) => {
        if (result) {

            Products.splice(id,1)
            //Guardarlo en el local storage
            localStorage.setItem('products',JSON.stringify( Products));
            renderizarTabla();
            showAlert('Producto eliminado Correctamente','error')
        }
      }).catch((error) =>{
        console.log(error)
      })
    
}


function editProduct(id){

    submitBtn.classList.add('edit-btn');
    submitBtn.innerText = 'Modificar Producto'

   let product = Products[id];

   const el = productForm.elements;
   
//    Object.keys(product).forEach((key) => {
//     if(typeof product[key] === "boolean")
//         return el[key].checked = product[key];

//     el[key].value = product[key];    
//    })

    editIndex = id;
    
   el.name.value = product.name;
   el.category.value = product.category,
   el.description.value = product.description;
   el.price.value = product.price;
   el.image.value = product.image;
   el.date.value = product.date;
}

//Funcion para filtrar la table de usuario segun un texto pasado como parametro
function metodoFilter(){
    const text =  document.getElementById('search').value; 
    const productsFiltrados = Products.filter((producto) => {
            const filtra = producto.name.toLowerCase().includes(text.toLowerCase())
            return filtra
             });

const cant = productsFiltrados.length;

document.getElementById('admin-product-search-container_cant').innerText = 'Cantidad de Coincidencias: ' + cant;


if(!cant){
    Products = JSON.parse(localStorage.getItem('products')) || [];
    renderizarTabla();
    showAlert('No hubo coincidencias')
}else{
    Products = productsFiltrados;             
    renderizarTabla();
    Products = JSON.parse(localStorage.getItem('products')) || [];
}


}