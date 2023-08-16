import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
    return(
        <div className="filter-checkbox">
            <button className="filter-checkbox__icon"></button>
            <p className="filter-checkbox__item">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;