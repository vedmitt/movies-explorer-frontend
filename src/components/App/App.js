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
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    const [isMenuOpen, setMenuOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState(''); // сообщение для форм
    // параметры для отображения фильмов
    const [rowLength, setRowLength] = React.useState(3);  // длина ряда карточек
    const [initialCardsLength, setInitialCardsLength] = React.useState(12);
    const [isLastRow, setIsLastRow] = React.useState(false);
    // текст для поиска
    const [keyword, setKeyword] = React.useState('');
    const [keywordSM, setKeywordSM] = React.useState('');
    // переключатели короткометражек
    const [isShortFilm, setIsShortFilm] = React.useState(false);
    const [isShortFilmSavedMovies, setIsShortFilmSavedMovies] = React.useState(false);
    // списки фильмов
    const [initialCards, setInitialCards] = React.useState([]);  // все фильмы с битфильм
    const [longFilmCards, setLongFilmCards] = React.useState([]);  // без фильтра Короткометражки
    const [favoredCards, setFavoredCards] = React.useState([]); // все сохраненные карточки

    const [foundCards, setFoundCards] = React.useState([]);  // все найденные или сохраненные фильмы
    const [visibleCards, setVisibleCards] = React.useState(['']);  // карточки в зоне видимости
    const [visibleCardsSM, setVisibleCardsSM] = React.useState(['']); // сохраненные карточки (используются только в Сохр фильмах!)


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

    const handleUpdateUser = (userInfo) => {
        mainApi.updateUserInfo(userInfo)
            .then(newUserInfo => {
                setMessage(profileEditSuccessMessage);
                setCurrentUser({
                    id: newUserInfo.data._id,
                    name: newUserInfo.data.name,
                    email: newUserInfo.data.email
                });
            })
            .catch(err => {
                setMessage('При обновлении профиля произошла ошибка.');
                console.error(err);
            });
    }

    const handleSignOut = () => {
        mainApi.logout()
            .then(res => {
                setCurrentUser(null);
                setKeyword('');
                setKeywordSM('');
                setIsShortFilm(false);
                setInitialCards([]);
                setFoundCards([]);
                setFavoredCards([]);
                setVisibleCards(['']);
                setVisibleCardsSM(['']);
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
                    setFavoredCards([]);
                    setVisibleCardsSM(['']);
                } else if (newCards.length > 0) {
                    setFavoredCards(newCards);
                    setVisibleCardsSM(newCards);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const searchCardsByWord = (cards, keyword) => {
        keyword = keyword.toLowerCase();
        const newCards = []
        cards.forEach(card => {
            let newCard = null;
            if (card.nameRU.toLowerCase().includes(keyword) || card.nameEN.toLowerCase().includes(keyword)) {
                newCard = card;
            }
            if (newCard) {
                newCards.push(newCard);
            }
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

    const handleMovieSearchClick = (key) => {
        setIsLoading(true);
        let cards = searchCardsByWord(initialCards, key);
        console.log('found cards', cards.length);

        // сохраняем поисковое слово
        setKeyword(key);
        localStorage.setItem('keyword', key);

        // сохраняем состояние переключателя
        setIsShortFilm(isShortFilm);
        localStorage.setItem('isShortFilm', isShortFilm);

        // сохраняем карточки
        setLongFilmCards(cards);
        localStorage.setItem('cards', JSON.stringify(cards));

        // фильтруем результат
        if (isShortFilm) {  // если короткометражки
            cards = filterCardsByDuration(cards);
        }
        setFoundCards(cards);
        setVisibleCards(cards.slice(0, initialCardsLength));
        setIsLoading(false);
    }

    const handleFilterCheckboxClick = (checkboxState) => {
        setIsShortFilm(!checkboxState);
        localStorage.setItem('isShortFilm', !isShortFilm);
        // console.log(!checkboxState);
        if (!checkboxState) { // если чекбокс включен
            const shortFilms = filterCardsByDuration(foundCards);
            console.log('short movies', shortFilms.length);
            setLongFilmCards(foundCards);
            setFoundCards(shortFilms);
            setVisibleCards(shortFilms.slice(0, initialCardsLength));
            localStorage.setItem('cards', JSON.stringify(foundCards));
        } else {
            console.log('return the result', longFilmCards.length);
            setFoundCards(longFilmCards);
            setVisibleCards(longFilmCards.slice(0, initialCardsLength));
            localStorage.setItem('cards', JSON.stringify(longFilmCards));
        }
    }

    const handleSMSearchClick = (keyword) => {
        // setIsLoading(true);
        // const cards = filterCards(keyword, favoredCards, isShortFilmSavedMovies);
        // setKeywordSM(keyword);
        // setVisibleCardsSM(cards);
        // setIsLoading(false);
    }

    const handleFilterCheckboxSMClick = () => {
        // if (!isShortFilmSavedMovies) {
        //     const sortedCards = filterCardsByDuration(favoredCards);
        //     setVisibleCardsSM(sortedCards);
        // } else {
        //     setVisibleCardsSM(favoredCards);
        // }
        // setIsShortFilmSavedMovies(!isShortFilmSavedMovies);
    }

    const handleShowMoreMovies = () => {
        setVisibleCards(foundCards.slice(0, visibleCards.length + rowLength));
    }

    const handleCardLike = (card) => {
        const isLiked = favoredCards?.some(savedCard => savedCard?.movieId === card.id && savedCard?.owner === currentUserState.id);
        const savedCard = isLiked ? favoredCards?.find(savedCard => savedCard?.movieId === card.id && savedCard?.owner === currentUserState.id) :
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
                    favoredCards.forEach(c => {
                        if (c._id !== savedCard._id) {
                            newCards.push(c);
                        }
                    })
                } else {
                    newCards = [...favoredCards, newCard.data];
                }
                if (!newCards.length) {
                    setFavoredCards([]);
                    setVisibleCardsSM(['']);
                } else if (newCards.length > 0) {
                    setFavoredCards(newCards);
                    setVisibleCardsSM(newCards);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleSavedMoviesRemove = (cardId) => {
        mainApi.removeLike(cardId)
            .then((newCard) => {
                const newCards = []
                favoredCards.forEach(c => {
                    if (c._id !== cardId) {
                        newCards.push(c);
                    }
                })
                if (!newCards.length) {
                    setFavoredCards([]);
                    setVisibleCardsSM(['']);
                } else if (newCards.length > 0) {
                    setFavoredCards(newCards);
                    setVisibleCardsSM(newCards);
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    // валидация токена пользователя и загрузка карточек
    React.useEffect(() => {
        handleValidateToken();

        moviesApi.getMovies()
            .then((cards) => {
                setInitialCards(cards);
                console.log('initial cards length', cards.length);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    // React.useEffect(() => {
    //     getSavedMovies();
    // }, [currentUserState?.id]);

    // отображение сохранненных в лок хранилище карточек (если есть)
    React.useEffect(() => {
        setIsLoading(true);
        const savedCheckbox = localStorage.getItem('isShortFilm');
        const savedKeyword = localStorage.getItem('keyword');
        const savedCards = JSON.parse(localStorage.getItem('cards'));

        // если данные имеются в локальном хранилище, то загружаем из него
        if ((savedCheckbox || savedKeyword) && savedCards) {
            const checkbox = savedCheckbox === "true" ? true : false;
            setIsShortFilm(checkbox);
            setKeyword(savedKeyword || '');
            if (checkbox) {
                const shortFilms = filterCardsByDuration(savedCards);
                setLongFilmCards(savedCards);
                setFoundCards(shortFilms);
                setVisibleCards(shortFilms.slice(0, initialCardsLength));
            } else {
                setFoundCards(savedCards);
                setVisibleCards(savedCards.slice(0, initialCardsLength));
            }
        } else {
            // загрузка карточек без параметров поиска
            setIsShortFilm(false);
            setKeyword('');
            setLongFilmCards(initialCards);
            setFoundCards(initialCards);
            setVisibleCards(initialCards.slice(0, initialCardsLength));
        }
        setIsLoading(false);
    }, [initialCards]);

    // перерисовка в случае ресайза
    React.useEffect(() => {
        setVisibleCards(foundCards.slice(0, initialCardsLength));
    }, [initialCardsLength]);

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
        setIsLastRow(visibleCards.length >= foundCards.length);
    }, [visibleCards, foundCards])

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
                                cards={visibleCards}
                                savedCards={favoredCards}
                                onShowMoreMovies={handleShowMoreMovies}
                                onSearchMovie={handleMovieSearchClick}
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
                                keyword={keywordSM}
                                cards={visibleCardsSM}
                                onSearchMovie={handleSMSearchClick}
                                onFilterCheckboxClick={handleFilterCheckboxSMClick}
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