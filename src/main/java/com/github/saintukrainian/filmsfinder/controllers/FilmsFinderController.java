package com.github.saintukrainian.filmsfinder.controllers;

import java.util.List;

import com.github.saintukrainian.filmsfinder.entity.Film;
import com.github.saintukrainian.filmsfinder.helper.HelperClass;
import com.github.saintukrainian.filmsfinder.jpa.FilmJpaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FilmsFinderController {

    @Autowired
    private FilmJpaRepository rep;

    @GetMapping("/")
    public String homePage() {
        return "home";
    }

    @GetMapping("/films")
    public String filmsPage(Model model) {
        model.addAttribute("films", HelperClass.getHelper().getFilms());

        return "films";
    }

    @GetMapping("/favouriteFilms")
    public String favouritesPage(Model model) {
        List<Film> list = rep.findByOrderByTitle();
        model.addAttribute("favs", list);
        return "films";
    }


}
