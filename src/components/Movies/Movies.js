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
    savedCards,
    isShortFilm,
    isLoading,
    isMenuOpen,
    isLastRow,
    onClosePopup,
    onOpenPopup,
    onSearchMovie,
    onShowMoreMovies,
    onFilterCheckboxClick,
    onCardLike,
}) {
    return (
        <>
            <Header><NavMovieTab onMenuClick={onOpenPopup} /></Header>
            <main>
                <SearchForm
                    savedKeyword={keyword}
                    onSubmit={onSearchMovie}
                />
                <FilterCheckbox
                    isShortFilm={isShortFilm}
                    onFilterCheckboxClick={onFilterCheckboxClick}
                />
                <MoviesCardList
                    cards={cards}
                    savedCards={savedCards}
                    isLoading={isLoading}
                    onAddMoviesClick={onShowMoreMovies}
                    onCardLike={onCardLike}
                    isLastRow={isLastRow}
                />
            </main>
            <Footer />
            <Navigation isOpen={isMenuOpen} onClose={onClosePopup} />
        </>
    );
}

export default Movies;