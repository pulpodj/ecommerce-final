let order = {
    products: [
        {
            productsName: 'XBOX',
            cantidad: 2,
            price: 1000
        },
        {
            productsName: 'Switch',
            cantidad: 1,
            price: 15000
        }
    ],
    user: 'email@gmail.com',
    total: 17000
}

function actualizarBadge(){
    badgeHTML.innerText = order.products.reduce((acc,producto)=>{
        return acc += producto.cantidad;
    },0);

}

actualizarBadge();