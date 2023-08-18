import React from "react";
import "./Portfolio.css";

function Portfolio() {
    return(
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__links">
                <li className="portfolio__item"><a className="portfolio__link" href="https://github.com/vedmitt/how-to-learn" target="blank">Статичный сайт</a></li>
                <li className="portfolio__item"><a className="portfolio__link" href="https://github.com/vedmitt/russian-travel" target="blank">Адаптивный сайт</a></li>
                <li className="portfolio__item"><a className="portfolio__link" href="https://github.com/vedmitt/react-mesto-api-full-gha" target="blank">Одностраничное приложение</a></li>
            </ul>
        </section>
    );
}

export default Portfolio;