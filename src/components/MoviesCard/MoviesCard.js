import React from "react";
import "./MoviesCard.css";
import { moviesApiBaseUrl } from "../../utils/constants";

function MoviesCard({ card, isSavedMovies, onCardLike }) {
    const [{ hours, minutes }, setTime] = React.useState([]);

    // const currentUser = React.useContext(CurrentUserContext);

    // const isOwn = card.owner._id === currentUser._id;
    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    // const cardLikeButtonClassName = `card__like-btn ${isLiked && 'card__like-btn_active'}`

    const handleLikeClick = () => {
        onCardLike(card);
    }

    // const handleDeleteClick = () => {
    //     onCardDelete(card);
    // }

    React.useEffect(() => {
        const hours = Math.floor(card.duration / 60);
        const minutes = card.duration % 60;

        setTime({ hours, minutes });
    }, [card.duration])

    return (
        <article className="movies-card" key={card.id}>
            <h3 className="movies-card__title">{card.nameRU}</h3>
            <button className={`movies-card__like ${card.isLiked && !isSavedMovies && 'movies-card__like_active'} ${isSavedMovies && "movies-card__remove"}`} onClick={handleLikeClick} type="button"></button>
            <p className="movies-card__duration">{hours > 0 && `${hours}ч`} {minutes > 0 && `${minutes}м`}</p>
            <a className="movies-card__link" href={card.trailerLink} target="blank"><img className="movies-card__image" src={moviesApiBaseUrl + card.image.url} alt={card.image.name} /></a>
        </article>
    );
}

export default MoviesCard;