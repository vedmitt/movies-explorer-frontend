import React from "react";
import "./NavMovieTab.css";
import { Link } from "react-router-dom";

function NavMovieTab({onMenuClick}) {
    return (
        <div className="nav-movie">
            <div className="nav-movie__links">
                <Link to='/movies' className="nav-movie__link nav-movie__link_bold">Фильмы</Link>
                <Link to='/saved-movies' className="nav-movie__link">Сохранённые фильмы</Link>
            </div>
            <Link to='/profile' className="nav-movie__profile-link">Аккаунт<button className="nav-movie__profile-icon" type="button"></button></Link>
            <button onClick={onMenuClick} className="nav-movie__btn" type="button"></button>
        </div>
    );
}

export default NavMovieTab;