import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NavMovieTab from "../NavMovieTab/NavMovieTab";
import Navigation from "../Navigation/Navigation";

function SavedMovies({isMenuOpen, onClosePopup, onOpenPopup}) {
    return (
        <>
            <Header><NavMovieTab onMenuClick={onOpenPopup} /></Header>
            <main>
                <SearchForm />
                <FilterCheckbox />
                <MoviesCardList />
            </main>
            <Footer />
            <Navigation isOpen={isMenuOpen} onClose={onClosePopup} />
        </>
    );
}

export default SavedMovies;