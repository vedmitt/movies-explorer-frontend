import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import "../Register/Register.css";
import Header from "../Header/Header";

function Login({ onLogin, name, buttonText }) {
    return (
        <div className='auth'>
            <Header isCenter={true}/>
            <h2 className="auth__title">Рады видеть!</h2>
            <AuthForm isRegister={false} onSubmit={onLogin} name={name} buttonText={buttonText} />
            <Link to='/signup' className="auth__link">Ещё не зарегистрированы? <span className="auth__link auth__link_color_orange">Регистрация</span></Link>
        </div>
    )
}

export default Login;