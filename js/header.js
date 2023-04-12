const signIn = document.getElementById('sign-in');


function renderHeaderLinks(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(currentUser){
    if(currentUser === 'ADMIN_ROLE'){
    signIn.innerHTML = `<div onclick="logout()"  class="navbar__nav-link">Logout</div>`
    const adminProductLink = createLinkElement('admin-product','Admin Product');
    const adminUserLink = createLinkElement('admin-user','Admin User');
    
    navbarList.appendChild(adminProductLink)
    navbarList.appendChild(adminUserLink)  
}
}
else {
    const link = createLinkElement('login','Login')
    signIn.replaceChildren(link)
}
}
function createLinkItemElement(path,text,type = null){
    const listItem = document.createElement('li');
    listItem.classList.add('navbar__nav-link');
    link = createLinkElement(path,text);
    listItem.appendChild(link);
    return listItem;

}

function createLinkElement(path,text){
    const link = document.createElement('a');
    link.classList.add('navbar__nav-link');
    link.href = `/pages/${path}/${path}.html`
    link.innerText = text;
    return link;
}

function logout(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser.role === 'ADMIN_ROLE'){
        document.getElementById('admin-product').remove();
        document.getElementById('admin-user').remove();
    }
    localStorage.removeItem('currentUser');
    renderHeaderLinks();
    
}

renderHeaderLinks();