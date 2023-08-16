import React from "react";
import NavTab from "../NavTab/NavTab";
import "./Header.css"

function Header() {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <NavTab />
        </header>
    );
}

export default Header;