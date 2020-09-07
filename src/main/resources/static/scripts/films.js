const filmsSection = document.getElementById("films-by-genre");
const filmsList = document.getElementById("movie-list");
const filmItems = document.querySelectorAll(".movie-element");

async function fillInFilms() {
    for (const filmElement of filmItems) {
        const id = filmElement.querySelector("input").getAttribute("value");
        console.log();
        const filmInfo = await axios
            .get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=58af3dc3b19432c261816f7a48688477&language=en-US`
            )
            .then((response) => response.data);
        console.log(filmInfo);
        let imageUrl = filmInfo.poster_path
            ? `https://image.tmdb.org/t/p/original${filmInfo.poster_path}`
            : "https://cdn.browshot.com/static/images/not-found.png";
        filmElement.querySelector("img").src = imageUrl;
        filmElement.querySelector("#plot").textContent = filmInfo.overview;
        filmElement
            .querySelector(".title-and-link a")
            .addEventListener("click", (event) => {
                event.preventDefault();
                location.href = `https://www.google.com/search?q=${filmInfo.title.toLowerCase()}`;
            });
        filmElement.addEventListener("click", (event) => {
            if (event.target.tagName === "A") {
                return;
            } else if (!confirm("Are you sure?")) {
                return false;
            } else {
                axios.delete(`http://localhost:8080/film/${id}`);
                filmElement.remove();
            }
        });
    }
}

fillInFilms();
