import React from "react";
import "./NavMovieTab.css";
import { Link } from "react-router-dom";

function NavMovieTab({ isAboutProject, onMenuClick }) {
    return (
        <nav className="nav-movie">
            <ul className="nav-movie__links">
                <li className="nav-movie__link-item">
                    <Link to='/movies' className={`nav-movie__link nav-movie__link_bold ${isAboutProject && "nav-movie__link_color_white"}`}>Фильмы</Link>
                </li>
                <li className="nav-movie__link-item">
                    <Link to='/saved-movies' className={`nav-movie__link ${isAboutProject && "nav-movie__link_color_white"}`}>Сохранённые фильмы</Link>
                </li>
            </ul>
            <Link to='/profile' className={`profile-link ${isAboutProject && "profile-link_color_white"}`}>Аккаунт</Link>
            <button onClick={onMenuClick} className="nav-movie__btn" type="button"></button>
        </nav>
    );
}

export default NavMovieTab;