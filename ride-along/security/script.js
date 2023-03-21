const urlSearchParams = new URLSearchParams(window.location.search);
const document_id = urlSearchParams.get('doc-id');

const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function () {
    console.log("button clicked");
    // menu.classList.remove('nonvisible');
    menu.classList.toggle('visible');
});

const backButton1 = document.getElementById("back-button1");

backButton1.addEventListener("click", function () {
    // backButton1.classList.add("visually-hidden");
    history.go(-1);
});


const myProfile = document.getElementById('profile-page');

myProfile.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `../my-profile.html?doc-id=${document_id}`;
})

const safety = document.getElementById('safety-page');

safety.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `./index.html?doc-id=${document_id}`;
})

const contact = document.getElementById('contact-page');

contact.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `../contact us/index.html?doc-id=${document_id}`;
})

const requestPage = document.getElementById('request-page');

requestPage.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = `../request.html?doc-id=${document_id}`;
})

