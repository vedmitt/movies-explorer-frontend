import React from "react";
import "./SearchForm.css";

function SearchForm() {
    return(
        <div className="search-form">
            <button className="search-form__icon"></button>
            <input className="search-form__input" placeholder="Фильм" ></input>
            <button className="search-form__button"></button>
        </div>
    );
}

export default SearchForm;