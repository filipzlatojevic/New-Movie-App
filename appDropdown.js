var burger = document.querySelector('.burger');
var navContainer = document.querySelector('.nav-container');
var filterBurger = document.querySelector('.filter-burger');
var filter = document.querySelector('.filter');

burger.addEventListener('click', function () {
    navContainer.classList.toggle('active');
    burger.classList.toggle('active');
});

filterBurger.addEventListener('click', function () {
    filter.classList.toggle('active-filter');
    filterBurger.classList.toggle('active');
});