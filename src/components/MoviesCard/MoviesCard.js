import React from "react";
import "./MoviesCard.css";

const baseUrl = "https://api.nomoreparties.co";

function MoviesCard({ card, isSavedMovies }) {
    const [{ hours, minutes }, setTime] = React.useState([]);

    React.useEffect(() => {
        const hours = Math.floor(card.duration / 60);
        const minutes = card.duration % 60;

        setTime({ hours, minutes });
    }, [card.duration])

    return (
        <article className="movies-card" key={card.id}>
            <h3 className="movies-card__title">{card.nameRU}</h3>
            <button className={`movies-card__like ${card.isLiked && !isSavedMovies && 'movies-card__like_active'} ${isSavedMovies && "movies-card__remove"}`} type="button"></button>
            <p className="movies-card__duration">{hours > 0 && `${hours}ч`} {minutes > 0 && `${minutes}м`}</p>
            <img className="movies-card__image" src={baseUrl + card.image.url} alt={card.image.name} />
        </article>
    );
}

export default MoviesCard;