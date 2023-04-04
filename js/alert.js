function showAlert(text, type){
    //vamos hacer nuestro pripio alert 

    const alertDialog = document.createElement('div');
    alertDialog.classList.add('alert-dialog');

    if(type === 'error'){
        alertDialog.style.backgroundColor = 'red';
    }

    alertDialog.innerText = text;


    document.querySelector('body').appendChild(alertDialog);
    //demora la aparicion
    setTimeout(()=> alertDialog.classList.add('show'),10)

    setTimeout(()=>{
        alertDialog.classList.remove('show')
        //demora se borrado
        setTimeout(()=>  alertDialog.remove(),10)
      //  window.location.href = '/pages/login/login.html';   
    },3000);
}
