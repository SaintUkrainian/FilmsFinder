const genresListHtml = document.querySelector(".genres-list");
const movieList = document.getElementById("movie-list");
const backdrop = document.querySelector(".backdrop");

// temporarily like that :)
const hrefFilmsUrl = `http://localhost:8080/#films-section`;
const hrefGenresUrl = `http://localhost:8080/#genres-section`
const postFilmsUrl = `http://localhost:8080/films`;
const genresHtml = document.querySelectorAll(".genre-btn");


let filmsByGenre = [];

async function addListenerToGenres() {
    for (const genreItem of genresHtml) {
        genreItem.addEventListener("click", async (event) => {
            location.href = hrefGenresUrl;
            document.querySelector(".films").classList.remove("visible");
            backdrop.classList.add("visible");
            movieList.innerHTML = "";
            const id = event.target.closest("li").getAttribute("id");
            filmsByGenre = await axios
                .get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=58af3dc3b19432c261816f7a48688477&with_genres=${id}&page=${Math.floor(
                        Math.random() * 100
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
                let imageUrl = film.poster_path ? `https://image.tmdb.org/t/p/original${film.poster_path}` : "https://cdn.browshot.com/static/images/not-found.png";
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
                document.querySelector(".films").classList.add("visible");
            }, 2000);
        });
    }
}

addListenerToGenres();
