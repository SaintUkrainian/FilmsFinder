package com.github.saintukrainian.filmsfinder.controllers;

import java.util.List;

import com.github.saintukrainian.filmsfinder.entity.Film;
import com.github.saintukrainian.filmsfinder.helper.HelperClass;
import com.github.saintukrainian.filmsfinder.jpa.FilmJpaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FilmsFinderRestController {

    @Autowired
    private FilmJpaRepository rep;


    @PostMapping("/film")
    public void postFilm(@RequestBody Film film){
        rep.save(film);
        System.out.println("Succesfully posted!");
    }

    @DeleteMapping("/film/{id}")
    public void deleteFromFavourite(@PathVariable int id) {
        rep.deleteById(id);
        System.out.println("Film with id: " + id + " was deleted!");
    }

    @PostMapping("/films")
    public void getFilms(@RequestBody List<Film> films) {
        HelperClass.getHelper().setFilms(films);
        films.forEach(film -> System.out.println(film));
    }
    
}
