var burger = document.querySelector('.burger');
var navContainer = document.querySelector('.nav-container');

burger.addEventListener('click', function () {
    navContainer.classList.toggle('active');
    burger.classList.toggle('active');
})