import React from "react";
// import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { cards } from '../../utils/constants.js';

function MoviesCardList({ isSavedMovies }) {
    return (
        <div className="movies-card-list">
            <div className="movies-card-list__photo-grid">
                {cards.map((card, index) => (
                    <MoviesCard card={card} cardId={index} isSavedMovies={isSavedMovies} />
                ))}
            </div>
            <button className={`movies-card-list__load-btn ${cards.length > 3 && 'movies-card-list__load-btn_active'}`}>Ещё</button>
        </div>
    );
}

export default MoviesCardList;