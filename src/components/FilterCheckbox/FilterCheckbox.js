import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox(isShortFilm, onClick) {
    const [isShort, setIsShort] = React.useState(false);

    // React.useEffect(() => {
    //     setIsShort(isShort);
    // }, []);

    return(
        <div className="filter-checkbox">
            <button className={`filter-checkbox__icon ${isShort && "filter-checkbox__icon_active"}`} onClick={onClick} type="button"></button>
            <p className="filter-checkbox__item">Короткометражки</p>
        </div>
    );
}

export default FilterCheckbox;