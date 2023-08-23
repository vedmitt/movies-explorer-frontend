import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavMovieTab from "../NavMovieTab/NavMovieTab";
import Navigation from "../Navigation/Navigation";

function Movies({
    keyword,
    cards,
    isShortFilm,
    isLoading,
    isMenuOpen,
    isLastRow,
    onSearchMovie,
    onShowMoreMovies,
    onClosePopup,
    onOpenPopup,
    onFilterCheckboxClick
}) {
    return (
        <>
            <Header><NavMovieTab onMenuClick={onOpenPopup} /></Header>
            <main>
                <SearchForm savedKeyword={keyword} onSubmit={onSearchMovie} />
                <FilterCheckbox isShortFilm={isShortFilm} onClick={onFilterCheckboxClick} />
                <MoviesCardList cards={cards} isLoading={isLoading} onAddMoviesClick={onShowMoreMovies} isLastRow={isLastRow} />
            </main>
            <Footer />
            <Navigation isOpen={isMenuOpen} onClose={onClosePopup} />
        </>
    );
}

export default Movies;