import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./AuthForm.css";

function AuthForm({ onSubmit, name, buttonText, isRegister }) {
    const initialState = { name: '', email: '', password: '' };
    const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation(initialState);

    React.useEffect(() => {
        resetForm(initialState, initialState);
    }, []);

    function handleNameChange(e) {
        console.log('changing');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onSubmit(values.name, values.email, values.password);
        }
    }

    return (
        <form onSubmit={handleSubmit} name={`form-${name}`} className="form" noValidate>

            {isRegister && <label className="form__label">Имя
            <input className={`form__input ${errors.name && "form__input-error-text"}`} id="name" value={values.name} onChange={handleChange} name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" required />
            <span className="form__input-error">{errors.name}</span>
            </label>}

            <label className="form__label">E-mail
            <input className={`form__input ${errors.email && "form__input-error-text"}`} id="email" value={values.email} onChange={handleChange} name="email" type="email" placeholder="Email" minLength="2" maxLength="40" required />
            <span className="form__input-error">{errors.email}</span>
            </label>

            <label className="form__label">Пароль
            <input className={`form__input ${errors.password && "form__input-error-text"}`} id="password" value={values.password} onChange={handleChange} name="password" type="password" placeholder="Пароль" minLength="6" maxLength="200" required />
            <span className="form__input-error">{errors.password}</span>
            </label>

            <button className={`form__save-btn ${!isRegister && "form__save-btn_margin_large"}`} type="submit">{buttonText}</button>
        </form>
    );
}

export default AuthForm;