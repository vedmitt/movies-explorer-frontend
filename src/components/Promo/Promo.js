import React from "react";
import "./Promo.css";

function Promo() {
    return (
        <section className="promo">
            <div className="promo__logo"></div>
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__paragraph">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <a href="https://github.com/vedmitt/movies-explorer-frontend" className="promo__link">Узнать больше</a>
        </section>
    );
}

export default Promo;