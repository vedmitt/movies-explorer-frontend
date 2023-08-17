import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";
import Header from "../Header/Header";

function Register({ onRegister, name, buttonText }) {
    return (
        <>
            <Header isCenter={true} />
            <main className='auth'>
                <h2 className="auth__title">Добро пожаловать!</h2>
                <AuthForm isRegister={true} onSubmit={onRegister} name={name} buttonText={buttonText} />
                <Link to='/signin' className="auth__link">Уже зарегистрированы? <span className="auth__link-orange">Войти</span></Link>
            </main>
        </>
    )
}

export default Register;