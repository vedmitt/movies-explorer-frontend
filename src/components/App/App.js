import React from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Register from "../Register/Register.js";

function App() {
    return (
        <div>
            <Header />
            <Register />
            {/* <SavedMovies /> */}
            {/* <Movies /> */}
            {/* <Main /> */}
            <Footer />
        </div>
    );
}

export default App;
