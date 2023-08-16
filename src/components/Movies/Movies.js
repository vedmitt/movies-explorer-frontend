import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
    return (
        <main>
            <SearchForm />
            <FilterCheckbox />
            <MoviesCardList />
        </main>
    );
}

export default Movies;