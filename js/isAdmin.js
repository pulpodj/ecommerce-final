const user = JSON.parse(localStorage.getItem('currentUser'));


if(!user || user.role !== 'ADMIN_ROLE'){
    //Sacar o redireccionar al usuario
    window.location.href = '/'
}