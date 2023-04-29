let Products = JSON.parse(localStorage.getItem('order')) || [];


//Tabla de productos
const tableBody = document.getElementById('order-table_body');
const submitBtn = document.getElementById('admin-product__submit-btn');
const productForm = document.getElementById('admin-product-form');

let editIndex;

function renderizarTabla(){
    let totalOrden = 0;
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
                <td><img class= "order__img" src="${imageSrc}" alt="${producto.name}" width="80px"></td>
                <td>${producto.name}</td>
                <td class="order__price">$ ${producto.price}</td>
                <td class="order__cant">
                <div class="order-cant-btn">
                <button class="order-cant-btn__decrement" onclick="decrement('${producto.name}')"
                id="order-cant-btn__decrement" >-</button>
                <input class="order-cant-btn__input" id="order-cant-input" type="text" 
                       value="${producto.cant}" onchange="updateTotal('${producto.name}')">
                <button class="order-cant-btn__increment" onclick="increment('${producto.name}')"
                id="order-cant-btn__increment">+</button>
                </div>
                </td>
                <td class="order__total">$ ${producto.total}
                <button class= "order__delete-btn" onclick= "deleteProduct(${index})" >
                <i class="fa-regular fa-trash-can"></i>
                </button></td>
                
                </td>
            </tr>
       ` 
       tableBody.innerHTML += tableRow; 
       totalOrden += producto.total;
    })
    const tableRow = `
        <tr>
                <td class="order-import-total" colspan = '4'>
                TOTAL
                </td>
                <td class="order-import-total">
                 $ ${totalOrden}
                </td>
        </tr>
       ` 
       tableBody.innerHTML += tableRow; 
}

renderizarTabla();


function deleteProduct(id){
    Products.splice(id,1)
    //Guardarlo en el local storage
    localStorage.setItem('order',JSON.stringify( Products));
    
    renderizarTabla();
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

function finalizarCompra(){
    alert('Compra Finalizada')
}

function increment(name) {
    var input = document.getElementById("order-cant-input")
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value + 1;
    updateTotal(name);
  }
  
  function decrement(name) {
    var input = document.getElementById("order-cant-input")
    var value = parseInt(input.value, 10);
    input.value = isNaN(value) ? 1 : value - 1;
    if (input.value < 1) {
      input.value = 1;
    }
    updateTotal(name)
  }

  function updateTotal(name){

    const cantProd = document.getElementById("order-cant-input"); 
            
    Order.find((prod)=>{
      if(prod.name === name){
        prod.cant =  parseInt(cantProd.value);
        prod.total = prod.cant * parseInt(prod.price);
        return prod;
      }
    })

   
// //Guardarlo en el local storage
localStorage.setItem('order',JSON.stringify( Order));

contarProductos();

  }