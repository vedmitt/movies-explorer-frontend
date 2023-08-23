import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import PageNotFound from "../PageNotFound/PageNotFound.js";
import Navigation from "../Navigation/Navigation.js";
import { moviesApi } from "../../utils/MoviesApi.js";

function App() {
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [totalCards, setTotalCards] = React.useState([]);
    const [cards, setCards] = React.useState([]);
    const [rowLength, setRowLength] = React.useState(3);
    const [initialCardsLength, setInitialCardsLength] = React.useState(3);
    const [isLastRow, setIsLastRow] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [keyword, setKeyword] = React.useState('');
    const [isShortFilm, setIsShortFilm] = React.useState(false);

    React.useEffect(() => {
        // setIsShortFilm(localStorage.getItem('isShortFilm'));
        // setKeyword(localStorage.getItem('keyword'));
        // const data = JSON.parse(localStorage.getItem('cards'));
        // // console.log(data);
        // if (data) {
        //     setTotalCards(data);
        //     setCards(data.slice(0, initialCardsLength));
        // }
    }, [initialCardsLength]);

    React.useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    React.useEffect(() => {
        if (windowWidth > 1087) {
            setInitialCardsLength(12);
            setRowLength(3);
        } else if (windowWidth > 688) {
            setInitialCardsLength(8);
            setRowLength(2);
        } else {
            setInitialCardsLength(5);
            setRowLength(2);
        }
    }, [windowWidth])

    React.useEffect(() => {
        // console.log(totalCards.length, cards.length);
        setIsLastRow(cards.length >= totalCards.length);
    }, [cards, totalCards])

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closePopup();
            }
        }
        if (isMenuOpen) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isMenuOpen])

    const closePopup = () => {
        setMenuOpen(false);
    }

    const handleMenuClick = () => {
        setMenuOpen(true);
    }

    const handleFilterCheckboxClick = () => {
        setIsShortFilm(!isShortFilm);
        console.log('checkbox click');
    }

    const handleMovieSearch = (keyword) => {
        setIsLoading(true);
        moviesApi.getMovies()
            .then((cards) => {
                setKeyword(keyword);
                // setTotalCards(cards);
                // setCards(cards.slice(0, initialCardsLength));
                // console.log('found: ', cards.length);

                // localStorage.setItem('keyword', keyword);
                // localStorage.setItem('isShortFilm', isShortFilm);
                // localStorage.setItem('cards', JSON.stringify(cards));
            })
            .catch(err => {
                console.error(err);
                setCards("error");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleShowMoreMovies = () => {
        setCards(totalCards.slice(0, cards.length + rowLength));
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/movies'
                    element={
                        <Movies
                            keyword={keyword}
                            cards={cards}
                            onShowMoreMovies={handleShowMoreMovies}
                            onSearchMovie={handleMovieSearch}
                            onClosePopup={closePopup}
                            onOpenPopup={handleMenuClick}
                            onFilterCheckboxClick={handleFilterCheckboxClick}
                            isShortFilm={isShortFilm}
                            isMenuOpen={isMenuOpen}
                            isLoading={isLoading}
                            isLastRow={isLastRow}
                        />
                    }
                />
                <Route path='/saved-movies'
                    element={
                        <SavedMovies
                            isMenuOpen={isMenuOpen}
                            onClosePopup={closePopup}
                            onOpenPopup={handleMenuClick}
                        />
                    }
                />
                <Route path='/signup'
                    element={
                        <Register
                            name='register'
                            buttonText='Зарегистрироваться'
                        />
                    }
                />
                <Route path='/signin'
                    element={
                        <Login
                            name='login'
                            buttonText='Войти'
                        />
                    }
                />
                <Route path='/profile'
                    element={
                        <Profile
                            name='Виталий'
                            isMenuOpen={isMenuOpen}
                            onClosePopup={closePopup}
                            onOpenPopup={handleMenuClick}
                        />
                    }
                />
                {/* <Route path='/navigation' element={<Navigation isOpen={true} />} />
                <Route path='/404' element={<PageNotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;