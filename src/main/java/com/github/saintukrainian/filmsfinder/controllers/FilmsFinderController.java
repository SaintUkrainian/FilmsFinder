package com.github.saintukrainian.filmsfinder.controllers;

import com.github.saintukrainian.filmsfinder.helper.HelperClass;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FilmsFinderController {

    @GetMapping("/")
    public String homePage() {
        return "home";
    }

    @GetMapping("/films")
    public String filmsPage(Model model){
        model.addAttribute("films", HelperClass.getHelper().getFilms());

        return "films";
    }


    
}
