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

async function addListenerToGenres() {
    for (const genreItem of genresHtml) {
        genreItem.addEventListener("click", async (event) => {
            location.href = hrefGenresUrl;
            movieList.classList.remove("wider");
            setTimeout(() => {
                if (filmsSection.classList.contains("visible")) {
                    filmsSection.classList.remove("visible");
                }
            }, 300);
            backdrop.classList.add("visible");
            movieList.innerHTML = "";
            const id = event.target.closest("li").getAttribute("id");
            filmsByGenre = await axios
                .get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=58af3dc3b19432c261816f7a48688477&with_genres=${id}&page=${Math.floor(
                        Math.random() * 100 + 1
                    )}`
                )
                .then((response) => response.data.results);
            const filmsJava = [];
            for (const film of filmsByGenre) {
                const filmJava = {
                    id: film.id,
                    title: film.title,
                    year: film.release_date.slice(0, 4),
                };
                filmsJava.push(filmJava);
                const filmElement = document.createElement("li");
                filmElement.className = "movie-element";
                filmElement.setAttribute("id", film.id);
                let imageUrl = film.poster_path
                    ? `https://image.tmdb.org/t/p/original${film.poster_path}`
                    : "https://cdn.browshot.com/static/images/not-found.png";
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
                movieList.appendChild(filmElement);
            }
            setTimeout(() => {
                axios.post(postFilmsUrl, filmsJava);
                location.href = hrefFilmsUrl;
                backdrop.classList.remove("visible");
                filmsSection.classList.add("visible");
            }, 2000);
        });
    }
}

addListenerToGenres();

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.getElementById("film-title");
    if(input.value.trim() === ""){
        input.value = "";
        return;
    } else{
        backdrop.classList.add("visible");
        location.href = hrefGenresUrl;
        setTimeout(() => {
            if (filmsSection.classList.contains("visible")) {
                filmsSection.classList.remove("visible");
            }
        }, 200);
        const regex = /,\s|\s/;
        console.log("Searching for film with title = " + input.value);
        const title = input.value.trim().toLowerCase().split(regex).join("+");
        console.log(title);
        const filmsByTitle = await axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=58af3dc3b19432c261816f7a48688477&query=${title}`
            )
            .then((response) => response.data.results);
        let foundFilm;
        for (const film of filmsByTitle) {
            if (
                film.original_title.toLowerCase().split(regex).join("+") === title
            ) {
                foundFilm = film;
                break;
            }
        }
    
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
            foundFilm = await axios.get(`https://api.themoviedb.org/3/movie/${foundFilm.id}?api_key=58af3dc3b19432c261816f7a48688477&language=en-US`).then(response => response.data);
            console.log(foundFilm);
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
            movieList.appendChild(filmElement);
            setTimeout(() => {
                filmsSection.classList.add("visible");
                backdrop.classList.remove("visible");
                location.href = hrefFilmsUrl;
            }, 1000);
        }
    }
});
