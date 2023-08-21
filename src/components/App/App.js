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
    const [cards, setCards] = React.useState([]);

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

    const handleMovieSearch = (keyword) => {
        moviesApi.getMovies()
            .then((cards) => {
                console.log(cards);
                setCards(cards);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/movies' element={<Movies cards={cards} onSearchMovie={handleMovieSearch} isMenuOpen={isMenuOpen} onClosePopup={closePopup} onOpenPopup={handleMenuClick} />} />
                <Route path='/saved-movies' element={<SavedMovies isMenuOpen={isMenuOpen} onClosePopup={closePopup} onOpenPopup={handleMenuClick} />} />
                <Route path='/signup' element={<Register name='register' buttonText='Зарегистрироваться' />} />
                <Route path='/signin' element={<Login name='login' buttonText='Войти' />} />
                <Route path='/profile' element={<Profile name='Виталий' isMenuOpen={isMenuOpen} onClosePopup={closePopup} onOpenPopup={handleMenuClick} />} />
                {/* <Route path='/navigation' element={<Navigation isOpen={true} />} />
                <Route path='/404' element={<PageNotFound />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;