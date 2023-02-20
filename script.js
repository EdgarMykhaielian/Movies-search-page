const searchBox = document.getElementById('search-box');
const searchList = document.getElementById('search-list');
const movieDetails = document.getElementById('movie-details')

searchBox.addEventListener('keyup', findMovies)

async function loadMovies(searchTerm) {
    const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=63c4f204`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Response === "True") {
        displayMovieList(data.Search);
    }
}

function findMovies() {
    let searchTerm = (searchBox.value).trim();
    if (searchTerm.length > 0) {
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add('search-list__item');
        if (movies[idx].Poster != "N/A") {
            moviePoster = movies[idx].Poster;
        } else {
            moviePoster = "image_not_found.png";
        }
        movieListItem.innerHTML = `
        <div class="search-list__thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-list__info">
            <h6>${movies[idx].Title}</h6>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem)
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list__item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            searchBox.value = '';
            const res = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=63c4f204`);
            const movieInfo = await res.json();
            movieDetails.innerHTML =`
            <div class="movie-poster">
                <img src="${movieInfo.Poster}">
            </div>
            <div class="movie-info">
                <h6 class="movie-title">${movieInfo.Title}</h6>
                <ul class="movie-misc-info">
                    <li class="year">Year: ${movieInfo.Year}
                    </li>
                    <li class="rated">Rated: ${movieInfo.Rated}
                    </li>
                    <li class="released">Released: ${movieInfo.Released}
                    </li>
                </ul>
                <p class="genre"><b>Genre:</b> ${movieInfo.Genre}</p>
                <p class="writer"><b>Writer:</b> ${movieInfo.Writer}</p>
                <p class="actors"><b>Actors: </b>${movieInfo.Actors}</p>
                <p class="plot"><b>Plot:</b> ${movieInfo.Plot}</p>
                <p class="language"><b>Language:</b>${movieInfo.Language}</p>
                <p class="awards"><b><i class="fas fa-award"></i></b> ${movieInfo.Awards}</p>
            </div>
            `

        })
    })
}









//titles: http://www.omdbapi.com/?s=titanic&apikey=63c4f204
//details: http://www.omdbapi.com/?i=tt3896198&apikey=63c4f204
//posters: http://img.omdbapi.com/?s=titanic&apikey=63c4f204
/* 
{"Search":
[
    {"Title":"Titanic","Year":"1997","imdbID":"tt0120338","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"},
    {"Title":"Titanic II","Year":"2010","imdbID":"tt1640571","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTMxMjQ1MjA5Ml5BMl5BanBnXkFtZTcwNjIzNjg1Mw@@._V1_SX300.jpg"},
    {"Title":"Titanic: The Legend Goes On...","Year":"2000","imdbID":"tt0330994","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTg5MjcxODAwMV5BMl5BanBnXkFtZTcwMTk4OTMwMg@@._V1_SX300.jpg"},
    {"Title":"Titanic","Year":"1953","imdbID":"tt0046435","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTU3NTUyMTc3Nl5BMl5BanBnXkFtZTgwOTA2MDE3MTE@._V1_SX300.jpg"},
    {"Title":"Raise the Titanic","Year":"1980","imdbID":"tt0081400","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNTQyZGI0NDgtYTM0ZC00NTdkLTk2OTItYTgwYmYwNjZlNDRlXkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_SX300.jpg"},
    {"Title":"Titanic","Year":"1996","imdbID":"tt0115392","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMTBhMjUzMDItYTBlZS00OThkLWJmZDQtMjg1YTQ5ZDkxYmFjXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_SX300.jpg"},
    {"Title":"La leggenda del Titanic","Year":"1999","imdbID":"tt1623780","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjMxNDU5MTk1MV5BMl5BanBnXkFtZTgwMDk5NDUyMTE@._V1_SX300.jpg"},
    {"Title":"Titanic","Year":"2012","imdbID":"tt1869152","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMTA4MjIyZWEtZjYwMS00ZmQ1LWJiMDEtMWNiNTI5NWE3OGJjXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_SX300.jpg"},
    {"Title":"Titanic 666","Year":"2022","imdbID":"tt18394428","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BM2MyYjI2MWMtNDVkZi00Mjk0LTk3MTctYTM4ZWU2NjkxMjU3XkEyXkFqcGdeQXVyNjE0MTY2NjY@._V1_SX300.jpg"},
    {"Title":"Titanic: Blood and Steel","Year":"2012","imdbID":"tt1695366","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMjI2MzU2NzEzN15BMl5BanBnXkFtZTcwMzI5NTU3Nw@@._V1_SX300.jpg"}
]
    
    ,"totalResults":"235","Response":"True"}
*/
