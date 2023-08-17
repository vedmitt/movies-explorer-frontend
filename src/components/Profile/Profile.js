import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import NavMovieTab from "../NavMovieTab/NavMovieTab";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";

function Profile({ name, isMenuOpen, onClosePopup, onOpenPopup }) {
    return (
        <>
            <Header><NavMovieTab onMenuClick={onOpenPopup} /></Header>
            <main className="profile">
                <h2 className="profile__title">Привет, {name}!</h2>
                <table className="profile__table">
                    <tr className="profile__line">
                        <td className="profile__cell">Имя</td>
                        <td className="profile__cell">{name}</td>
                    </tr>
                    <tr className="profile__line">
                        <td className="profile__cell">E-mail</td>
                        <td className="profile__cell">example@mail.ru</td>
                    </tr>
                </table>
                <nav>
                    <ul className="profile__links">
                        <li><a href="#d" className="profile__link">Редактировать</a></li>
                        <li><Link to="/" className="profile__link profile__link_color_red">Выйти из аккаунта</Link></li>
                    </ul>
                </nav>
            </main>
            <Navigation isOpen={isMenuOpen} onClose={onClosePopup} />
        </>
    );
}

export default Profile;