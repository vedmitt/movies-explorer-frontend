import React from "react";
import { useLocation } from 'react-router-dom'
import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation({ isOpen, onClose }) {
    const location = useLocation();

    return (
        <section className={`navigation ${isOpen && 'navigation_opened'}`}>
            <div className="navigation__container">
                <button className="navigation__close-btn" onClick={onClose} type="button"></button>
                <nav>
                    <ul className="navigation__links">
                        <li className="navigation__link-item">
                            <Link to="/" className={`navigation__link ${location.pathname === "/" && "navigation__link_active"}`}>Главная</Link>
                        </li>
                        <li className="navigation__link-item">
                            <Link to="/movies" className={`navigation__link ${location.pathname === "/movies" && "navigation__link_active"}`}>Фильмы</Link>
                        </li>
                        <li className="navigation__link-item">
                            <Link to="/saved-movies" className={`navigation__link ${location.pathname === "/saved-movies" && "navigation__link_active"}`}>Сохранённые фильмы</Link>
                        </li>
                        <li className="navigation__link-item">
                            <Link to='/profile' className={`profile-link profile-link_margin_large ${location.pathname === "/profile" && "navigation__link_active"}`}>Аккаунт</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default Navigation;