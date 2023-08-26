import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
    isSavedMovies,
    isLoading,
    cards,
    savedCards,
    onAddMoviesClick,
    onCardLike,
    isLastRow
}) {
    return (
        isLoading ? <Preloader /> :
            cards === null ?
                <p className="movies-card-list-message">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> :
                cards.length === 0 ?
                    <p className="movies-card-list-message">Ничего не найдено</p> :
                    <div className={`movies-card-list ${(isLastRow || isSavedMovies) && 'movies-card-list_margin_large'}`}>
                        <div className={"movies-card-list__photo-grid"}>
                            {/* рендерим карточки с битфильм */}
                            {!isSavedMovies ?
                                cards[0] !== '' && cards.map(card => (
                                    <MoviesCard savedCards={savedCards} key={card.id} card={card} isSavedMovies={isSavedMovies} onCardLike={onCardLike} />
                                ))
                                :
                                cards[0] !== '' && cards.map(card => (
                                    <MoviesCard savedCards={null} key={card._id} card={card} isSavedMovies={isSavedMovies} onCardLike={() => onCardLike(card._id)} />))
                            }
                            {/* сораненнные карточки */}
                        </div>
                        {!isSavedMovies && <button onClick={onAddMoviesClick} className={`movies-card-list__load-btn ${!isLastRow && 'movies-card-list__load-btn_active'}`} type="button">Ещё</button>}
                    </div>
    );
}

export default MoviesCardList;