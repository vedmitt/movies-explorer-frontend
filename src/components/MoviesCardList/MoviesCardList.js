import React from "react";
// import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { cards } from '../../utils/constants.js';

function MoviesCardList() {
    return (
        <>
            <div className="movies-card-list">
                {cards.map((card, index) => (
                    <MoviesCard card={card} cardId={index} />
                ))}
            </div>
            <button className={`movies-card-list__load-btn ${cards.length > 3 && 'movies-card-list__load-btn_active'}`}>Ещё</button>
        </>
    );
}

export default MoviesCardList;