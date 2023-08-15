import React from "react";
import "./AboutMe.css";

function AboutMe() {
    return (
        <section className="aboutme">
            <h2 className="about-project__title">Студент</h2>
            <div className="aboutme__content">
                <article className="aboutme__text">
                    <h3 className="aboutme__title">Вероника</h3>
                    <h4 className="aboutme__subtitle">Фулстек-разработчик, 28 лет</h4>
                    <p className="aboutme__description">Родилась и живу в Иркутске. Со школы увлекаюсь программированием. Два года работала в качестве Python-разработчика, в данный момент осваиваю Веб-разработку.</p>
                    <a className="aboutme__link" href="https://github.com/vedmitt" target="blank">Github</a>
                </article>
                <div className="aboutme__photo"></div>
            </div>
        </section>
    );
}

export default AboutMe;