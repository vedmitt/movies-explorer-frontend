import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import "../Register/Register.css";
import Header from "../Header/Header";

function Login({ onLogin, name, buttonText, message, isLoading }) {
    return (
        <>
            <Header isAuth={true} />
            <main className='auth'>
                <h2 className="auth__title">Рады видеть!</h2>
                <AuthForm isRegister={false} onSubmit={onLogin} name={name} buttonText={buttonText} message={message} isLoading={isLoading} />
                <Link to='/signup' className="auth__link">Ещё не зарегистрированы? <span className="auth__link-orange">Регистрация</span></Link>
            </main>
        </>
    )
}

export default Login;