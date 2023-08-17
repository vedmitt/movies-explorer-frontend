import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return(
        <section className="about-project">
            <h2 className="landing-subtitle">О проекте</h2>
            <div className="about-project__content">
                <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about-project__schema">
                <div className="about-project__schema-progress about-project__schema-progress_color_green">1 неделя</div>
                <div className="about-project__schema-progress">4 недели</div>
                <p className="about-project__schema-description">Back-end</p>
                <p className="about-project__schema-description">Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;