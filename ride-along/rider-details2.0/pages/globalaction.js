

// action on menu button
const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function () {
    menu.classList.toggle('visible');
})


// action on back button
const backButton = document.getElementById('back-button');
if (backButton) {
  backButton.addEventListener('click', () => {
    history.go(-1);
  });
}





