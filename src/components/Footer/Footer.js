import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__content">
                <p className="footer__copyright">©{new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li className="footer__link-item"><a href="https://practicum.yandex.ru/" target="blank" className="footer__link">Яндекс.Практикум</a></li>
                    <li className="footer__link-item"><a href="https://github.com/vedmitt/movies-explorer-frontend" target="blank" className="footer__link">Github</a></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;