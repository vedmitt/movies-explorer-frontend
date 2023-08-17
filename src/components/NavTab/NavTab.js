import React from "react";
import "./NavTab.css";
import { Link } from "react-router-dom";

function NavTab() {
    return (
        <nav>
            <ul className="navtab">
                <li><Link to='/signup' className="navtab__link">Регистрация</Link></li>
                <li><Link to='/signin' className="navtab__link navtab__link_color_green">Войти</Link></li>
            </ul>
        </nav>
    );
}

export default NavTab;