import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";
import Header from "../Header/Header";

function Register({ onRegister, name, buttonText }) {
    return (
        <div className='auth'>
            <Header isCenter={true} />
            <h2 className="auth__title">Добро пожаловать!</h2>
            <AuthForm isRegister={true} onSubmit={onRegister} name={name} buttonText={buttonText} />
            <Link to='/signin' className="auth__link">Уже зарегистрированы? <span className="auth__link auth__link_color_orange">Войти</span></Link>
        </div>
    )
}

export default Register;