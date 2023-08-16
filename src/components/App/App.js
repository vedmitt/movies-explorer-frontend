import React from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";

function App() {
    return (
        <div>
            <Header />
            <Movies />
            {/* <Main /> */}
            <Footer />
        </div>
    );
}

export default App;
