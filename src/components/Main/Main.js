import React from "react";
import Promo from "../Promo/Promo.js"
import AboutProject from "../AboutProject/AboutProject.js";
import Techs from "../Techs/Techs.js";
import AboutMe from "../AboutMe/AboutMe.js";
import Portfolio from "../Portfolio/Portfolio.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import NavTab from "../NavTab/NavTab.js";
import NavMovieTab from "../NavMovieTab/NavMovieTab.js";
import Navigation from "../Navigation/Navigation.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({ isMenuOpen, onOpenPopup, onClosePopup }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Header isAboutProject={true}>
                {currentUser?.email ? <NavMovieTab isAboutProject={true} onMenuClick={onOpenPopup} /> : <NavTab />}
            </Header>
            <main>
                <Promo />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </main>
            <Footer />
            <Navigation isOpen={isMenuOpen} onClose={onClosePopup} />
        </>
    );
}

export default Main;