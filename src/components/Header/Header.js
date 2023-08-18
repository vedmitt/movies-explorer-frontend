import React from "react";
import "./Header.css"
import { Link } from "react-router-dom";

function Header({isAboutProject, children, isAuth}) {
    return (
        <header className={`header ${isAboutProject && "header_color_blue"} ${isAuth && "header_size_small"} ${isAuth && "header_position_center"}`}>
            <Link to='/'><div className="header__logo"></div></Link>
            {children}
        </header>
    );
}

export default Header;