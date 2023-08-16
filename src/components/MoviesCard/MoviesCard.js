import React from "react";
import "./MoviesCard.css";

function MoviesCard({card, cardId}) {
    return(
        <article className="movies-card" key={cardId}>
            <h3 className="movies-card__title">{card.name}</h3>
            <button className={`movies-card__like ${card.isLiked && 'movies-card__like_active'}`} type="button"></button>
            <p className="movies-card__duration">{card.duration}</p>
            <img className="movies-card_image" src={card.link} alt="Постер фильма"/>
        </article>
    );
}

export default MoviesCard;