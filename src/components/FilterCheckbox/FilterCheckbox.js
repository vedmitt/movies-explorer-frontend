import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ isShortFilm, onFilterCheckboxClick }) {
    return (
        <div className="filter-checkbox">
            <button className={`filter-checkbox__icon ${isShortFilm && "filter-checkbox__icon_active"}`} onClick={onFilterCheckboxClick} type="button"></button>
            <p className="filter-checkbox__item">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;