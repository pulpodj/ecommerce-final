//1- Obtener los datos del Formulario
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit',(event) => {
    event.preventDefault();

    const {email,password} = loginForm.elements;
    console.log(email.value,password.value)


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
        showAlert(`Los Datos ingresados no son correctos`,'error');
    }
    
    if(user.password === password.value){
        localStorage.setItem('currentUser',JSON.stringify(user));
        showAlert('Login correcto')
        setTimeout(() => {
            window.location.href = "/index.html";
        }, 1500)
    }
    //3- Guardar en el registro (LocalStorage) los datos de la persona logueada en ese momento.
    
    // Funcion LogOut
    //1- Borrar el usuario del local storage


})
//

