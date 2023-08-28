import React from "react";
import "./PageNotFound.css";
import { Link, useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();

    return(
        <main className="page404">
        <div>
            <h1 className="page404__title">404</h1>
            <p className="page404__desc">Страница не найдена</p>
        </div>
        <button className="page404__link" onClick={() => navigate(-1)}>Назад</button>
        </main>
    );
}

export default PageNotFound;