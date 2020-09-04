package com.github.saintukrainian.filmsfinder.controllers;

import com.github.saintukrainian.filmsfinder.entity.Film;
import com.github.saintukrainian.filmsfinder.jpa.FilmJpaRepository;

import org.springframework.beans.factory.annotation.Autowired;
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
    
}
