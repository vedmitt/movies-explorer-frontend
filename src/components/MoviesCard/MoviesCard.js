import React from "react";
import "./MoviesCard.css";

function MoviesCard({card, cardId, isSavedMovies}) {
    return(
        <article className="movies-card" key={cardId}>
            <h3 className="movies-card__title">{card.name}</h3>
            <button className={`movies-card__like ${card.isLiked && !isSavedMovies && 'movies-card__like_active'} ${isSavedMovies && "movies-card__remove"}`} type="button"></button>
            <p className="movies-card__duration">{card.duration}</p>
            <img className="movies-card__image" src={card.link} alt="Постер фильма"/>
        </article>
    );
}

export default MoviesCard;