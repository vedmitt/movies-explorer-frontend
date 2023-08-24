import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ isLoading, cards, isSavedMovies, onAddMoviesClick, onCardLike, isLastRow }) {
    return (
        isLoading ? <Preloader /> :
            cards === null ? <p className="movies-card-list-message">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> :
                cards.length === 0 ?
                    <p className="movies-card-list-message">Ничего не найдено</p> :
                    <div className={`movies-card-list ${isLastRow && 'movies-card-list_margin_large'}`}>
                        <div className={"movies-card-list__photo-grid"}>
                            {cards[0] !== '' && cards.map(card => (
                                <MoviesCard key={card.id} card={card} isSavedMovies={isSavedMovies} onCardLike={onCardLike} />
                            ))}
                        </div>
                        <button onClick={onAddMoviesClick} className={`movies-card-list__load-btn ${!isLastRow && 'movies-card-list__load-btn_active'}`} type="button">Ещё</button>
                    </div>
    );
}

export default MoviesCardList;