import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({isOpen, onClose}) {
    return (
        <div className={`navigation ${isOpen && 'navigation_opened'}`}>
            <div className="navigation__container">
                <button className="navigation__close-btn link" onClick={onClose} type="button"></button>
                <div className="navigation__links">
                    <Link to="/" className="navigation__link link">Главная</Link>
                    <Link to="/movies" className="navigation__link navigation__link_active link">Фильмы</Link>
                    <Link to="saved-movies" className="navigation__link link">Сохранённые фильмы</Link>
                    <Link to='/profile' className="navigation__account-link link">Аккаунт<button className="nav-movie__profile-icon" type="button"></button></Link>
                </div>
            </div>
        </div>
    );
}

export default Navigation;