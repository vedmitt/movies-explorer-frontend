import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavMovieTab from "../NavMovieTab/NavMovieTab";
import Navigation from "../Navigation/Navigation";

function SavedMovies({
    isMenuOpen,
    onClosePopup,
    onOpenPopup,
    keyword,
    cards,
    onSearchMovie,
    onFilterCheckboxClick,
    onCardRemove,
    isShortFilm,
    isLoading }) {
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
                    isSavedMovies={true}
                    cards={cards}
                    savedCards={null}
                    isLoading={isLoading}
                    onAddMoviesClick={null}
                    onCardLike={onCardRemove}
                    isLastRow={null}
                />
            </main>
            <Footer />
            <Navigation isOpen={isMenuOpen} onClose={onClosePopup} />
        </>
    );
}

export default SavedMovies;