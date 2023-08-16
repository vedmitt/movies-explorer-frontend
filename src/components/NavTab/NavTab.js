import React from "react";
import "./NavTab.css";

function NavTab() {
    return(
        <div className="navtab">
            <a className="navtab__link" href="">Регистрация</a>
            <a className="navtab__link navtab__link_color_green" href="">Войти</a>
        </div>
    );
}

export default NavTab;