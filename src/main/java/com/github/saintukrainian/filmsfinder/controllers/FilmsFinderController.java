package com.github.saintukrainian.filmsfinder.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FilmsFinderController {

    @GetMapping("/")
    public String homePage() {
        return "home";
    }
    
}
