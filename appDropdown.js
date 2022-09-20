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

// Animation on logo
const textTag = document.querySelector('header h1');
const textArr = textTag.innerText.split('');
textTag.innerHTML = '';

for (let char of textArr) {
    if (char == ' ') {
        char = '&nbsp;';
    }
    textTag.innerHTML += `<span>${char}</span>`;
}

let k = 0;
const spans = textTag.querySelectorAll('span');
const interval = setInterval(() => {
    spans[k].classList.add('fadeMove');

    k++;
    if (k === spans.length) {
        clearInterval(interval);
    }
}, 100);