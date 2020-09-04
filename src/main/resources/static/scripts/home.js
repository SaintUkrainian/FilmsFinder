function postFilm() {
    const film = {
        id: "228",
        title: "Ebat, ono rabotaet",
        year: "1337"
    };

    axios.post(`${document.URL}/film`, film);
}

postFilm();