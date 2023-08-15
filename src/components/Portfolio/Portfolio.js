import React from "react";
import "./Portfolio.css";

function Portfolio() {
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <a className="portfolio__link" href="https://github.com/vedmitt/how-to-learn" target="blank">Статичный сайт</a>
                <a className="portfolio__link" href="https://github.com/vedmitt/russian-travel" target="blank">Адаптивный сайт</a>
                <a className="portfolio__link" href="https://github.com/vedmitt/react-mesto-api-full-gha" target="blank">Одностраничное приложение</a>
            </ul>
        </section>
    );
}

export default Portfolio;