import React from "react";
import "./PageNotFound.css";
import { Link } from "react-router-dom";

function PageNotFound() {
    return(
        <>
        <div className="page404">
            <h1 className="page404__title">404</h1>
            <p className="page404__desc">Страница не найдена</p>
        </div>
        <Link to='/' className="page404__link">Назад</Link>
        </>
    );
}

export default PageNotFound;