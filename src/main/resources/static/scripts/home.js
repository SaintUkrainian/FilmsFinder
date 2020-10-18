const body = document.querySelector("body");
const genresListHtml = document.querySelector(".genres-list");
const movieList = document.getElementById("movie-list");
const backdrop = document.querySelector(".backdrop");
const searchForm = document.getElementById("search-film");
const filmsSection = document.querySelector(".films");

// temporarily like that :)
const hrefFilmsUrl = `http://localhost:8080/#films-section`;
const hrefGenresUrl = `http://localhost:8080/#genres-section`;
const postFilmsUrl = `http://localhost:8080/films`;
const genresHtml = document.querySelectorAll(".genre-btn");

let filmsByGenre = [];

//function for toggling styles
function toggleLiked(item) {
    if (item.classList.contains("green")) {
        item.classList.add("brighter-white");
        item.classList.remove("green");
        item.classList.remove("brighter-green");
    } else {
        item.classList.remove("brighter-white");
        item.classList.add("brighter-green");
        item.classList.add("green");
    }
}


// function for setting hover over single item
function setHoverForSingleItem(item) {
    item.addEventListener("mouseenter", (event) => {
        if (item.classList.contains("green")) {
            item.classList.add("brighter-green");
        } else {
            item.classList.add("brighter-white");
        }
    });

    item.addEventListener("mouseleave", (event) => {
        if (item.classList.contains("green")) {
            item.classList.remove("brighter-green");
        } else {
            item.classList.remove("brighter-white");
        }
    });
}

// function for smart hovering over film items
function setHoverForFilmItem() {
    const listItems = movieList.querySelectorAll("li");
    for (const item of listItems) {
        item.addEventListener("mouseenter", (event) => {

            if (item.classList.contains("green")) {
                item.classList.add("brighter-green");
            } else {
                item.classList.add("brighter-white");
            }
        });

        item.addEventListener("mouseleave", (event) => {

            if (item.classList.contains("green")) {
                item.classList.remove("brighter-green");
            } else {
                item.classList.remove("brighter-white");
            }
        });
    }
}

// async function for adding listeners to genres
async function addListenerToGenres() {
    // looping over each li item in ul 
    for (const genreItem of genresHtml) {
        // adding listener to get the list of films by clicking on genre 
        genreItem.addEventListener("click", async (event) => {
            // getting back to genres location, to give the time to load films from api
            location.href = hrefGenresUrl;
            movieList.classList.remove("wider");
            // setting timeout to load data
            setTimeout(() => {
                if (filmsSection.classList.contains("visible")) {
                    filmsSection.classList.remove("visible");
                }
            }, 300);
            backdrop.classList.add("visible");

            movieList.innerHTML = "";
            // getting id for further manipulations
            const id = event.target.closest("li").getAttribute("id");
            // getting list of films by sending GET request
            filmsByGenre = await axios
                .get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=58af3dc3b19432c261816f7a48688477&with_genres=${id}&page=${Math.floor(
                        Math.random() * 100 + 1
                    )}`
                )
                .then((response) => response.data.results);
            // creating an array to send to java controller
            const filmsJava = [];
            for (const film of filmsByGenre) {
                // getting only needed information
                const filmJava = {
                    id: film.id,
                    title: film.title,
                    year: film.release_date.slice(0, 4),
                };
                filmsJava.push(filmJava);

                // creating li to append to ul
                const filmElement = document.createElement("li");
                filmElement.className = "movie-element";
                // setting id attribute for further manipulations
                filmElement.setAttribute("id", film.id);
                // getting image url by checking if film.poster_path exists and using ternary operator
                let imageUrl = film.poster_path
                    ? `https://image.tmdb.org/t/p/original${film.poster_path}`
                    : "https://cdn.browshot.com/static/images/not-found.png";
                // filling in out li with data
                filmElement.innerHTML = `
                    <div class="movie-element__image">
                        <img src="${imageUrl}" alt="${film.title}">
                    </div>
                    <div class="movie-element__info">
                        <h5 id="title">${film.title}</h5>
                        <hr class="hr-list">
                        <p class="film-info"><span>Release date: </span>${film.release_date}</p>
                        <p class="film-info"><span>Plot: </span>${film.overview}</p>
                    </div>
                `;

                // setting listener for adding film to favourites
                filmElement.addEventListener("click", () => {
                    if (filmElement.classList.contains("green")) {
                        axios.delete(`http://localhost:8080/film/${filmElement.getAttribute("id")}`);
                        toggleLiked(filmElement);
                    } else {
                        axios.post("http://localhost:8080/film", filmJava);
                        toggleLiked(filmElement);
                    }
                });

                // appending to ul 
                movieList.appendChild(filmElement);
            }

            // setting smart hovering for films which we've got before
            setHoverForFilmItem();

            // setting timeout to get rid of lags, while data is being loaded
            setTimeout(() => {
                axios.post(postFilmsUrl, filmsJava);
                location.href = hrefFilmsUrl;
                backdrop.classList.remove("visible");
                filmsSection.classList.add("visible");
            }, 2000);
        });
    }
}

// adding listener to genres while page is being loaded
addListenerToGenres();

// adding listener to searching form
searchForm.addEventListener("submit", async (event) => {
    // preventing page from reload
    event.preventDefault();

    // getting user's input
    const input = document.getElementById("film-title");
    // checking if nothing's wrong with it
    if (input.value.trim() === "") {
        input.value = "";
        return;
    } else {
        backdrop.classList.add("visible");
        location.href = hrefGenresUrl;
        setTimeout(() => {
            if (filmsSection.classList.contains("visible")) {
                filmsSection.classList.remove("visible");
            }
        }, 200);

        // using regular expression for getting just words without spaces or commas
        const regex = /,\s|\s/;

        // creating title for api request
        const title = input.value.trim().toLowerCase().split(regex).join("+");
        // sending request to get the film
        const filmsByTitle = await axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=58af3dc3b19432c261816f7a48688477&query=${title}`
            )
            .then((response) => response.data.results);
        let foundFilm;

        // checking if we've got an appropriate one
        for (const film of filmsByTitle) {
            if (
                film.original_title.toLowerCase().split(regex).join("+") === title
            ) {
                foundFilm = film;
                break;
            }
        }
        // if nothing's found, it'll show a sorry message :)
        if (!foundFilm) {
            movieList.innerHTML = `<h1>Sorry, we couldn't find the film with title: ${input.value}</h1>`;
            setTimeout(() => {
                filmsSection.classList.add("visible");
                backdrop.classList.remove("visible");
                location.href = hrefFilmsUrl;
            }, 1000);
        } else {
            movieList.innerHTML = "";
            movieList.classList.add("wider");
            // getting detailed information about film
            foundFilm = await axios.get(`https://api.themoviedb.org/3/movie/${foundFilm.id}?api_key=58af3dc3b19432c261816f7a48688477&language=en-US`).then(response => response.data);

            const filmElement = document.createElement("li");
            filmElement.className = "searched-element";

            let imageUrl = foundFilm.poster_path
                ? `https://image.tmdb.org/t/p/original${foundFilm.poster_path}`
                : "https://cdn.browshot.com/static/images/not-found.png";
            let filmGenres = foundFilm.genres.map(e => e.name).join(", ");

            filmElement.innerHTML = `
                <div class="searched-element__image">
                    <img src="${imageUrl}" alt="${foundFilm.title}">
                </div>
                <div class="searched-element__info">
                    <h5 id="title">${foundFilm.title}</h5>
                    <p>${foundFilm.tagline}</p>
                    <hr class="hr-list">
                    <p class="searched-info"><span>Release date: </span>${foundFilm.release_date}</p>
                    <p class="searched-info"><span>Runtime: </span>${foundFilm.runtime} minutes</p>
                    <p class="searched-info"><span>Genres: </span>${filmGenres}</p>
                    <p class="searched-info"><span>Budget: </span>$${foundFilm.budget}</p>
                    <p class="searched-info"><span>Revenue: </span>$${foundFilm.revenue}</p>
                    <p class="searched-info"><span>Plot: </span>${foundFilm.overview}</p>
               </div>
            `;
            // creating an object to send to rest controller to save the film in database
            const filmJava = {
                id: foundFilm.id,
                title: foundFilm.title,
                year: foundFilm.release_date.slice(0, 4),
            };

            filmElement.setAttribute("id", foundFilm.id);

            filmElement.addEventListener("click", () => {
                if (filmElement.classList.contains("green")) {
                    axios.delete(`http://localhost:8080/film/${filmElement.getAttribute("id")}`);
                    toggleLiked(filmElement);
                } else {
                    axios.post("http://localhost:8080/film", filmJava);
                    toggleLiked(filmElement);
                }
            });

            setHoverForSingleItem(filmElement);

            movieList.appendChild(filmElement);

            setTimeout(() => {
                filmsSection.classList.add("visible");
                backdrop.classList.remove("visible");
                location.href = hrefFilmsUrl;
            }, 1000);
        }
    }
});
