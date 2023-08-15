import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__content">
                <p className="footer__copyright">©{new Date().getFullYear()}</p>
                <div className="footer__links">
                    <a href="https://practicum.yandex.ru/" target="blank" className="footer__link">Яндекс.Практикум</a>
                    <a href="https://github.com/vedmitt/movies-explorer-frontend" target="blank" className="footer__link">Github</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;