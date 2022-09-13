// Selecting elements from document
const form = document.querySelector('#searchForm');
const container = document.querySelector('.container');

const homeBtn = document.querySelector('.homeBtn');
const popular = document.querySelector('#popular');
const topRated = document.querySelector('#topRated');
const upcoming = document.querySelector('#upcoming');
const best = document.querySelector('#best');

const links = document.querySelectorAll('.genres li');

// Dates
let currentDate = new Date().toJSON().slice(0, 10);

let someDate = new Date();
let result = someDate.setDate(someDate.getDate() + 60);
let futureDate = new Date(result).toJSON().slice(0, 10);

// Api url
const api_key = 'api_key=55c9fee551b2a928c4ee12a92f75b54a';
const base_url = 'https://api.themoviedb.org/3';

const popular_url = base_url + '/discover/movie?sort_by=popularity.desc&' + api_key;
const upcoming_url = base_url +
    `/discover/movie?primary_release_date.gte=${currentDate}&primary_release_date.lte=${futureDate}&` + api_key;
const top_rated_url = base_url +
    `/movie/top_rated?${api_key}&language=en-US&page=1`;
const best_url = base_url +
    '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&' + api_key;

const query = base_url + `/search/movie?${api_key}&query=`; // For searching movies

// Home page
const home = async function home() {
    container.innerHTML = '';
    const res = await axios.get(base_url +
        `/discover/movie?with_genres=53&primary_release_year=2022&` + api_key);
    importMovies(res);
}
window.onload = home;

// Home button
homeBtn.addEventListener('click', home);

// Navbar:
// Popular
popular.addEventListener('click', async function () {
    container.innerHTML = '';
    const res = await axios.get(popular_url);

    importMovies(res);
});
// Top rated
topRated.addEventListener('click', async function () {
    container.innerHTML = '';
    const res = await axios.get(top_rated_url);

    importMovies(res);
});
// Upcoming
upcoming.addEventListener('click', async function () {
    container.innerHTML = '';
    const res = await axios.get(upcoming_url);

    importMovies(res);
});
// Best from 2010
// best.addEventListener('click', async function () {
//     container.innerHTML = '';
//     const res = await axios.get(best_url);

//     importMovies(res);
// });

// Genres
for (let li of links) {
    li.addEventListener('click', async function () {
        container.innerHTML = '';
        const id = parseInt(this.value);
        const genres_url = base_url +
            `/discover/movie?with_genres=${id}&primary_release_year=2022&` + api_key;
        const res = await axios.get(genres_url);

        importMovies(res);
    });
}

// Search form
form.addEventListener('submit', async function (e) {
    e.preventDefault();  // prevent reloading page
    container.innerHTML = '';

    const searchTerm = this.elements.inputData.value; // this give us a value which is typed in form
    const res = await axios.get(query + searchTerm);

    importMovies(res);
});

// Function for importing data from api, creating elements and appending them to document
function importMovies(res) {
    for (let el of res.data.results) {
        let path = el.poster_path;
        let title = el.original_title;
        let score = el.vote_average;
        let overview = el.overview;

        if (path) {
            const imgSource = 'https://image.tmdb.org/t/p/w500/' + path;
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `
    <a target="_blank" href="${imgSource}">
    <img src="${imgSource}" alt="Image"></a>
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="rate">${score}</span>
    </div>
        <div class="overview">
            <div class="overview-info">
            <h3>Overview</h3>
            <span class="seeMore">See more</span>
        </div>
        ${overview}
    </div>
    `
            container.append(movieDiv);
        }
    }
}