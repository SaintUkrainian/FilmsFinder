function addFilmToFavourite() {
    const film = {
        id: "228",
        title: "Ebat, ono rabotaet",
        year: "1337"
    };

    axios.post(`${document.URL}/film`, film);
}

function deleteFilmFromFavourite(){
    const id = 228;
    axios.delete(`${document.URL}/film/${id}`);
}