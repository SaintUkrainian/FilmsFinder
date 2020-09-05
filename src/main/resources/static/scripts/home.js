const genresListHtml = document.querySelector(".genres-list");

let genres = [];
let filmsByGenre = [];

async function getGenres() {
    genres = await axios
        .get(
            "https://api.themoviedb.org/3/genre/movie/list?api_key=58af3dc3b19432c261816f7a48688477&language=en-US"
        )
        .then((response) => response.data.genres);
    console.log(genres);
    for (const genre of genres) {
        const genreItem = document.createElement("li");
        genreItem.setAttribute("id", genre.id);
        genreItem.innerHTML = `
            <a href="${document.URL}films" class="genre-category">${genre.name}</h3>
        `;
        genreItem.addEventListener("click", async (event) => {
            event.preventDefault();
            const id = genreItem.getAttribute("id");
            filmsByGenre = await axios
                .get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=58af3dc3b19432c261816f7a48688477&with_genres=${id}&page=${Math.floor(
                        Math.random() * 1 + 1
                    )}`
                )
                .then((response) => response.data.results);
                console.log(filmsByGenre);
                const filmsJava = [];
                for (const film of filmsByGenre) {
                    const filmJava = {
                        id: film.id,
                        title: film.title,
                        year: film.release_date.slice(0, 4)
                    }
                    filmsJava.push(filmJava);
                }
                axios.post(`${document.URL}films`, filmsJava);
                location.href = `${document.URL}films`;
        });
        genresListHtml.appendChild(genreItem);
        console.log(genreItem);
    }
}

getGenres();

