package com.github.saintukrainian.filmsfinder.jpa;

import java.util.List;

import com.github.saintukrainian.filmsfinder.entity.Film;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FilmJpaRepository extends JpaRepository<Film, Integer> {

    List<Film> findByOrderByTitle();

}
    
