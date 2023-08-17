import React from "react";
import "./AboutMe.css";

function AboutMe() {
    return (
        <section className="aboutme">
            <h2 className="landing-subtitle">Студент</h2>
            <article className="aboutme__content">
                <div className="aboutme__text">
                    <h3 className="aboutme__title">Вероника</h3>
                    <h4 className="aboutme__subtitle">Фулстек-разработчик, 28 лет</h4>
                    <p className="aboutme__description">Родилась и живу в Иркутске. Со школы увлекаюсь программированием. Два года работала в качестве Python-разработчика, в данный момент осваиваю Веб-разработку. С 2015 года работала в компании «СКБ Контур». После того, как прошла курс по веб-разработке, начала заниматься фриланс-заказами и ушла с постоянной работы.</p>
                    <a className="aboutme__link" href="https://github.com/vedmitt" target="blank">Github</a>
                </div>
                <div className="aboutme__photo"></div>
            </article>
        </section>
    );
}

export default AboutMe;