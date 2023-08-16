import React from "react";
import "./SearchForm.css";

function SearchForm() {
    return(
        <section className="search-form">
            <button className="search-form__icon"></button>
            <input className="search-form__input" placeholder="Фильм" ></input>
            <button className="search-form__button"></button>
        </section>
    );
}

export default SearchForm;