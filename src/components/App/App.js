import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Profile from "../Profile/Profile.js";
import PageNotFound from "../PageNotFound/PageNotFound.js";
import ProtectedRoute from "../ProtectedRoute.js/ProtectedRoute.js";
import { moviesApi } from "../../utils/MoviesApi.js";
import { mainApi } from "../../utils/MainApi.js";
import { currentUser, CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { moviesApiBaseUrl, profileEditSuccessMessage } from "../../utils/constants.js";

function App() {
    const [currentUserState, setCurrentUser] = React.useState(currentUser);
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [totalCards, setTotalCards] = React.useState([]);  // все фильмы с битфильм
    const [cards, setCards] = React.useState(['']);  // карточки в зоне видимости
    const [savedCards, setSavedCards] = React.useState([]); // все сохраненные карточки
    const [cardsSavedMovies, setCardsSavedMovies] = React.useState(['']); // сохраненные карточки (используются только в Сохр фильмах!)
    const [rowLength, setRowLength] = React.useState(3);  // длина ряда карточек
    const [initialCardsLength, setInitialCardsLength] = React.useState(12);
    const [isLastRow, setIsLastRow] = React.useState(false);
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [keyword, setKeyword] = React.useState('');
    const [keywordSavedMovies, setKeywordSavedMovies] = React.useState('');
    const [isShortFilm, setIsShortFilm] = React.useState(false);
    const [isShortFilmSavedMovies, setIsShortFilmSavedMovies] = React.useState(false);
    const [message, setMessage] = React.useState('');


    const handleRegisterUser = (email, password, name) => {
        mainApi.register(name, email, password)
            .then(res => {
                setMessage('');
                // авторизация и перенаправление на Фильмы
                handleLoginUser(email, password);
            }).catch(err => {
                setMessage(err === 'Ошибка: 409' ?
                    'Пользователь с таким email уже существует.' :
                    'При регистрации пользователя произошла ошибка.');
            });
    }

    const handleLoginUser = (email, password) => {
        mainApi.login(email, password)
            .then(res => {
                setMessage('');
                // токен создан и записан в куки
                // валидируем токен
                handleValidateToken();
            }).catch(err => {
                setMessage((err === 'Ошибка: 401' && 'Вы ввели неправильный логин или пароль.') ||
                    (err === 'Ошибка: 400' && 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.') ||
                    'При авторизации произошла ошибка. Переданный токен некорректен.');
            })
    }

    const handleValidateToken = () => {
        mainApi.validateToken()
            .then((data) => {
                if (data) {
                    setCurrentUser({
                        id: data.data._id,
                        name: data.data.name,
                        email: data.data.email
                    });
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleSignOut = () => {
        mainApi.logout()
            .then(res => {
                setCurrentUser(null);
                setKeyword('');
                setKeywordSavedMovies('');
                setIsShortFilm(false);
                setTotalCards([]);
                setSavedCards([]);
                setCards(['']);
                setCardsSavedMovies(['']);
                setMessage('');
                localStorage.removeItem('keyword');
                localStorage.removeItem('isShortFilm');
                localStorage.removeItem('cards');
            }).catch(err => {
                setMessage('Не получилось выйти из профиля');
            });
    }

    const closePopup = () => {
        setMenuOpen(false);
    }

    const handleMenuClick = () => {
        setMenuOpen(true);
    }

    const handleFilterCheckboxClick = () => {
        if (!isShortFilm) {
            const sortedCards = filterCardsByDuration(totalCards);
            setTotalCards(sortedCards);
            setCards(sortedCards.slice(0, initialCardsLength));
            localStorage.setItem('isShortFilm', !isShortFilm);
            localStorage.setItem('cards', JSON.stringify(sortedCards));
        }
        setIsShortFilm(!isShortFilm);
    }

    const handleFilterCheckboxSavedMovies = () => {
        if (!isShortFilmSavedMovies) {
            const sortedCards = filterCardsByDuration(savedCards);
            setCardsSavedMovies(sortedCards);
        } else {
            setCardsSavedMovies(savedCards);
        }
        setIsShortFilmSavedMovies(!isShortFilmSavedMovies);
    }

    const filterCards = (keyword, cards, isShortFilm) => {
        keyword = keyword.toLowerCase();
        const newCards = []
        cards.forEach(card => {
            let newCard = null;
            if (card.nameRU.toLowerCase().includes(keyword) || card.nameEN.toLowerCase().includes(keyword)) {
                if (isShortFilm) {
                    if (card.duration <= 40) {
                        newCard = card;
                    }
                }
                newCard = card;
            }
            newCard && newCards.push(newCard);
        })
        return newCards;
    }

    const filterCardsByDuration = (cards) => {
        const newCards = [];
        cards.forEach(card => {
            if (card.duration <= 40) {
                newCards.push(card);
            }
        })
        return newCards;
    }

    const getSavedMovies = () => {
        mainApi.getMovies()
            .then(({ data }) => {
                const newCards = [];
                data.forEach(c => {
                    if (c.owner === currentUserState.id) {
                        newCards.push(c);
                    }
                });
                if (!newCards.length) {
                    setSavedCards([]);
                    setCardsSavedMovies(['']);
                } else if (newCards.length > 0) {
                    setSavedCards(newCards);
                    setCardsSavedMovies(newCards);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleMovieSearch = (keyword) => {
        setIsLoading(true);
        moviesApi.getMovies()
            .then((cards) => {
                cards = filterCards(keyword, cards, isShortFilm);
                setKeyword(keyword);
                setTotalCards(cards);
                setCards(cards.slice(0, initialCardsLength));
                localStorage.setItem('keyword', keyword);
                localStorage.setItem('isShortFilm', isShortFilm);
                localStorage.setItem('cards', JSON.stringify(cards));
            })
            .catch(err => {
                console.error(err);
                setCards(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleSavedMovieSearch = (keyword) => {
        setIsLoading(true);
        const cards = filterCards(keyword, savedCards, isShortFilmSavedMovies);
        setKeywordSavedMovies(keyword);
        setCardsSavedMovies(cards);
        setIsLoading(false);
    }

    const handleShowMoreMovies = () => {
        setCards(totalCards.slice(0, cards.length + rowLength));
    }

    const handleCardLike = (card) => {
        const isLiked = savedCards?.some(savedCard => savedCard?.movieId === card.id && savedCard?.owner === currentUserState.id);
        const savedCard = isLiked ? savedCards?.find(savedCard => savedCard?.movieId === card.id && savedCard?.owner === currentUserState.id) :
            {
                country: card.country,
                director: card.director,
                duration: card.duration,
                year: card.year,
                description: card.description,
                image: moviesApiBaseUrl + card.image.url,
                trailerLink: card.trailerLink,
                thumbnail: moviesApiBaseUrl + card.image.previewUrl.split('\n')[0],
                movieId: card.id,
                nameRU: card.nameRU,
                nameEN: card.nameEN,
            };

        mainApi.changeLikeCardStatus(savedCard, isLiked)
            .then((newCard) => {
                let newCards = [];
                if (isLiked) {
                    savedCards.forEach(c => {
                        if (c._id !== savedCard._id) {
                            newCards.push(c);
                        }
                    })
                } else {
                    newCards = [...savedCards, newCard.data];
                }
                if (!newCards.length) {
                    setSavedCards([]);
                    setCardsSavedMovies(['']);
                } else if (newCards.length > 0) {
                    setSavedCards(newCards);
                    setCardsSavedMovies(newCards);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleUpdateUser = (userInfo) => {
        mainApi.updateUserInfo(userInfo)
            .then(newUserInfo => {
                setMessage(profileEditSuccessMessage);
                setCurrentUser({ id: newUserInfo.data._id, name: newUserInfo.data.name, email: newUserInfo.data.email });
            })
            .catch(err => {
                setMessage('При обновлении профиля произошла ошибка.');
                console.error(err);
            });
    }

    const handleSavedMoviesRemove = (cardId) => {
        mainApi.removeLike(cardId)
            .then((newCard) => {
                const newCards = []
                savedCards.forEach(c => {
                    if (c._id !== cardId) {
                        newCards.push(c);
                    }
                })
                if (!newCards.length) {
                    setSavedCards([]);
                    setCardsSavedMovies(['']);
                } else if (newCards.length > 0) {
                    setSavedCards(newCards);
                    setCardsSavedMovies(newCards);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }
    
    // валидация токена пользователя
    React.useEffect(() => {
        handleValidateToken();
    }, []);

    React.useEffect(() => {
        getSavedMovies();
    }, [currentUserState?.id]);

    // отображение сохранненных в лок хранилище карточек (если есть)
    React.useEffect(() => {
        setIsShortFilm(localStorage.getItem('isShortFilm') === "true" ? true : false);
        setKeyword(localStorage.getItem('keyword') || '');

        const data = JSON.parse(localStorage.getItem('cards'));
        if (data) {
            setTotalCards(data);
            setCards(data.slice(0, initialCardsLength));
        } else {
            // загрузка карточек с битфильмс
            setIsLoading(true);
            moviesApi.getMovies()
                .then((cards) => {
                    setTotalCards(cards);
                    setCards(cards.slice(0, initialCardsLength));
                })
                .catch(err => {
                    console.error(err);
                    setCards(null);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [currentUserState?.id, initialCardsLength]);

    // навешивание ресайза на окно
    React.useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    // корректное отображение ряда карточек
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
    }, [initialCardsLength, rowLength, windowWidth])

    // нужно ли скрыть кнопку Еще
    React.useEffect(() => {
        setIsLastRow(cards.length >= totalCards.length);
    }, [cards, totalCards])

    // навешивание обработчиков на закрытие меню
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

    return (
        <CurrentUserContext.Provider value={currentUserState}>
            <BrowserRouter>
                <Routes>
                    <Route path='/'
                        element={
                            <Main
                                isMenuOpen={isMenuOpen}
                                onClosePopup={closePopup}
                                onOpenPopup={handleMenuClick}
                            />
                        }
                    />
                    <Route path='/movies'
                        element={
                            <ProtectedRoute
                                element={Movies}
                                loggedIn={currentUserState}
                                isMenuOpen={isMenuOpen}
                                onClosePopup={closePopup}
                                onOpenPopup={handleMenuClick}
                                keyword={keyword}
                                cards={cards}
                                savedCards={savedCards}
                                onShowMoreMovies={handleShowMoreMovies}
                                onSearchMovie={handleMovieSearch}
                                onFilterCheckboxClick={handleFilterCheckboxClick}
                                onCardLike={handleCardLike}
                                isShortFilm={isShortFilm}
                                isLoading={isLoading}
                                isLastRow={isLastRow}
                            />
                        }
                    />
                    <Route path='/saved-movies'
                        element={
                            <ProtectedRoute
                                element={SavedMovies}
                                loggedIn={currentUserState}
                                isMenuOpen={isMenuOpen}
                                onClosePopup={closePopup}
                                onOpenPopup={handleMenuClick}
                                keyword={keywordSavedMovies}
                                cards={cardsSavedMovies}
                                onSearchMovie={handleSavedMovieSearch}
                                onFilterCheckboxClick={handleFilterCheckboxSavedMovies}
                                onCardRemove={handleSavedMoviesRemove}
                                isShortFilm={isShortFilmSavedMovies}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route path='/signup'
                        element={
                            currentUserState?.email ? <Navigate to="/movies" replace /> :
                                <Register
                                    name='register'
                                    buttonText='Зарегистрироваться'
                                    onRegister={handleRegisterUser}
                                    message={message}
                                />
                        }
                    />
                    <Route path='/signin'
                        element={
                            currentUserState?.email ? <Navigate to="/movies" replace /> :
                                <Login
                                    name='login'
                                    buttonText='Войти'
                                    onLogin={handleLoginUser}
                                    message={message}
                                />
                        }
                    />
                    <Route path='/profile'
                        element={
                            <ProtectedRoute
                                element={Profile}
                                loggedIn={currentUserState}
                                isMenuOpen={isMenuOpen}
                                onClosePopup={closePopup}
                                onOpenPopup={handleMenuClick}
                                onUpdateUser={handleUpdateUser}
                                message={message}
                                currentUser={currentUserState}
                                onSignOut={handleSignOut}
                            />
                        }
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </CurrentUserContext.Provider>
    );
}

export default App;