import React from "react";
import "./NavTab.css";
import { Link } from "react-router-dom";

function NavTab() {
    return(
        <div className="navtab">
            <Link to='/signup' className="navtab__link">Регистрация</Link>
            <Link to='/signin' className="navtab__link navtab__link_color_green">Войти</Link>
        </div>
    );
}

export default NavTab;