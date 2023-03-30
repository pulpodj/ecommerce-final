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
        email: el.email.value
    }

    //Agregar en el array primero
    users.push(use);
    //ahora lo agrego en el localstorage
    localStorage.setItem( 'users',JSON.stringify(users));

    showAlert('El usuario se registro correctamente','success');

    
     
})


function showAlert(text, type){
    //vamos hacer nuestro pripio alert 

    const alertDialog = document.createElement('div');
    alertDialog.classList.add('alert-dialog0');

    if(type === 'error'){
        alertDialog.style.backgroundColor = 'red';
    }

    alertDialog.innerText = text;
    document.querySelector('body').appendChild(alertDialog);

    setTimeout(()=>{
        alertDialog.remove();
       // window.location.href = '/pages/login/login.html';   
    },3000);
}

