package com.github.saintukrainian.filmsfinder.helper;

import java.util.List;

import com.github.saintukrainian.filmsfinder.entity.Film;

public class HelperClass {
    private List<Film> films;
    private static HelperClass helper;

    private HelperClass() {

    }

    public static HelperClass getHelper() {
        if (helper == null) {
            helper = new HelperClass();
        }
        return helper;
    }
    public void setFilms(List<Film> films) {
        this.films = films;
        System.out.println("Films are set!");
    }

    public List<Film> getFilms() {
        return films;
    }
}
