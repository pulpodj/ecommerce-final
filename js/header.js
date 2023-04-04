const signIn = document.getElementById('sign-in');


function renderHeaderLinks(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(currentUser){
    signIn.innerHTML = `<div onclick="logout()"  class="navbar__nav-link">Logout</div>`
}
else {
    signIn.innerHTML = `<a href="/pages/login/login.html"  class="navbar__nav-link">Login</a>`
}
}

function logout(){
    localStorage.removeItem('currentUser')
    renderHeaderLinks();
}

renderHeaderLinks();