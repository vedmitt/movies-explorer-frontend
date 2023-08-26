import React from "react";
import "./NavMovieTab.css";
import { Link, useLocation } from "react-router-dom";

function NavMovieTab({ isAboutProject, onMenuClick }) {
    const location = useLocation();

    return (
        <nav className="nav-movie">
            <ul className="nav-movie__links">
                <li className="nav-movie__link-item">
                    <Link to='/movies' className={`nav-movie__link ${location.pathname === "/movies" && "nav-movie__link_bold"} ${isAboutProject && "nav-movie__link_color_white"}`}>Фильмы</Link>
                </li>
                <li className="nav-movie__link-item">
                    <Link to='/saved-movies' className={`nav-movie__link ${location.pathname === "/saved-movies" && "nav-movie__link_bold"} ${isAboutProject && "nav-movie__link_color_white"}`}>Сохранённые фильмы</Link>
                </li>
            </ul>
            <Link to='/profile' className={`profile-link ${location.pathname === "/profile" && "profile-link_bold"} ${isAboutProject && "profile-link_color_white"}`}>Аккаунт</Link>
            <button onClick={onMenuClick} className="nav-movie__btn" type="button"></button>
        </nav>
    );
}

export default NavMovieTab;