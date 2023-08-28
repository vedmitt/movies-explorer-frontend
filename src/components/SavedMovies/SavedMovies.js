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
    cards,
    onSearchMovie,
    onFilterCheckbox,
    onCardRemove,
    isLoading }) {
    const [checkbox, setCheckbox] = React.useState(false);
    const [searchWord, setSearchWord] = React.useState('');
    const [totalCards, setTotalCards] = React.useState(cards);
    const [foundCards, setFoundCards] = React.useState([]);
    const [visibleCards, setVisibleCards] = React.useState(['']);

    React.useEffect(() => {
        setCheckbox(false);
        setSearchWord('');
    }, []);

    React.useEffect(() => {
        setTotalCards(cards);

        if (cards?.length > 0) {
            console.log(cards.length, totalCards.length);
            // если карточка была удалена
            if (cards.length < totalCards.length) {
                setFoundCards(foundCards.filter(el => cards.indexOf(el) > -1));  // исключим из списка найденных
                setVisibleCards(visibleCards.filter(el => cards.indexOf(el) > -1)); // оставим только совпадающие элементы
            } else {
                setFoundCards(cards);
                setVisibleCards(cards);
            }
        } else {
            setVisibleCards(['']);
        }
    }, [cards]);

    const handleMovieSearchClick = (searchWord) => {
        console.log('word', searchWord, checkbox);
        // setIsLoading(true);
        let newCards = onSearchMovie(totalCards, searchWord);
        console.log('found cards', newCards.length);
        setFoundCards(newCards);

        // фильтруем результат
        if (checkbox) {  // если короткометражки
            const newCardsShort = onFilterCheckbox(newCards);
            setVisibleCards(newCardsShort);
        } else {
            setVisibleCards(newCards);
        }
        setCheckbox(checkbox);
        // setIsLoading(false);
    }

    const handleCheckboxClick = () => {
        setCheckbox(!checkbox);
        if (!checkbox) {
            const shortMovies = onFilterCheckbox(foundCards);
            setVisibleCards(shortMovies);
        } else {
            setVisibleCards(foundCards);
        }
    }

    return (
        <>
            <Header><NavMovieTab onMenuClick={onOpenPopup} /></Header>
            <main>
                <SearchForm
                    savedKeyword={searchWord}
                    onSubmit={handleMovieSearchClick}
                />
                <FilterCheckbox
                    isShortFilm={checkbox}
                    onFilterCheckboxClick={handleCheckboxClick}
                />
                <MoviesCardList
                    isSavedMovies={true}
                    cards={visibleCards}
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