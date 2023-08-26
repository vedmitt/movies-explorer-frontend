import React from "react";
import "./MoviesCard.css";
import { moviesApiBaseUrl } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({ card, savedCards, isSavedMovies, onCardLike }) {
    const [{ hours, minutes }, setTime] = React.useState([]);

    const currentUser = React.useContext(CurrentUserContext);

    const isLiked = savedCards?.some(savedCard => savedCard?.movieId === card.id && savedCard?.owner === currentUser.id);

    const handleLikeClick = () => {
        onCardLike(card);
    }

    React.useEffect(() => {
        const hours = Math.floor(card.duration / 60);
        const minutes = card.duration % 60;

        setTime({ hours, minutes });
    }, [card.duration])

    return (
        card &&
        <article className="movies-card" key={card.id ? card.id : card._id}>
            <h3 className="movies-card__title">{card.nameRU}</h3>
            <button className={`movies-card__like ${isLiked && !isSavedMovies && 'movies-card__like_active'} ${isSavedMovies && "movies-card__remove"}`} onClick={handleLikeClick} type="button"></button>
            <p className="movies-card__duration">{hours > 0 && `${hours}ч`} {minutes > 0 && `${minutes}м`}</p>
            <a className="movies-card__link" href={card.trailerLink} target="blank"><img className="movies-card__image" src={card.image?.url ? moviesApiBaseUrl + card.image.url : card.image} alt={card.nameRU} /></a>
        </article>
    );
}

export default MoviesCard;