import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ isOpen, onClose }) {
    return (
        <div className={`navigation ${isOpen && 'navigation_opened'}`}>
            <div className="navigation__container">
                <button className="navigation__close-btn link" onClick={onClose} type="button"></button>
                <nav>
                    <ul className="navigation__links">
                        <li><Link to="/" className="navigation__link link">Главная</Link></li>
                        <li><Link to="/movies" className="navigation__link navigation__link_active link">Фильмы</Link></li>
                        <li><Link to="/saved-movies" className="navigation__link link">Сохранённые фильмы</Link></li>
                        <li><Link to='/profile' className="navigation__account-link link">Аккаунт</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Navigation;