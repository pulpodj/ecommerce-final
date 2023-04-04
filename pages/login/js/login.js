//1- Obtener los datos del Formulario
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit',(event) => {
    event.preventDefault();

    const {email,password} = loginForm.elements;
    console.log(email.value,password.value)
})
//

const users = JSON.parse(localStorage.getItem('users')) || [];

//2-Chequear datos ingresados
    //a- Existe email
    //b- Password deberian ser las mismas

const user = users.find((usr) => {
    if(usr.email === email.value){
        return true;
    }
    return false;
})

if(!user || user.password !== password.value) {
    alert(`Los Datos ingresados no son correctos`);
}

if(user.password === password.value){
    localStorage.setItem('correntUser',JSON.stringify(user));
    alert('Login correcto')

}
//3- Guardar en el registro (LocalStorage) los datos de la persona logueada en ese momento.

// Funcion LogOut
//1- Borrar el usuario del local storage