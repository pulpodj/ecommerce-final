// obtener formulario y guardarlo en una 
const registerForm = document.querySelector('#registerForm');
//obtener boton submit
const resgisterBtn = document.getElementById('registerSubmit');

registerForm.addEventListener('submit', (evt)=>{
    console.log()
    evt.preventDefault();

    //tomar los datos y amar el objeto usuario
    const el = evt.target.elements;
    console.log(el)

    if (el.password1.value !== el.password2.value) {
        console.warn('El password no coincide')
    }
    //Obtener los usuarios guardados en local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    let userEmailExist =  users.find(urs => {
        if (urs.email === el.email.value)
             return true;
            
        return false;
        
    });
    //
    if(userEmailExist)
    {
      showAlert('El usuario ya existe','error');
      return;  
    }
    //

    const use = {
        name: el.fullName.value,
        age: el.age.value,
        password: el.password1.value,
        email: el.email.value,
        role: 'USER_ROLE'
    }

    //Agregar en el array primero
    users.push(use);
    //ahora lo agrego en el localstorage
    localStorage.setItem( 'users',JSON.stringify(users));

    showAlert('El usuario se registro correctamente','success');

    
     
})




// Funciones con parámetros nombrados
function customFont({ color, size, weight }) {
    const divTexto = document.createElement('p');
    divTexto.innerText = 'Un texto a modificar'

    divTexto.style.color = color || '#DDF40A';
    divTexto.style.fontSize = size || '16px';
    divTexto.style.fontWeight = weight || 500;

    document.body.appendChild(divTexto);
}

customFont({ weight: 800 });