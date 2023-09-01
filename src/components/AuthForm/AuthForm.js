import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./AuthForm.css";

function AuthForm({ onSubmit, name, buttonText, isRegister, message, isLoading }) {
    const initialState = { name: '', email: '', password: '' };
    const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation(initialState);
    const [formMessage, setFormMessage] = React.useState('');
    const [isShowMessage, setIsShowMessage] = React.useState(false);

    React.useEffect(() => {
        setFormMessage('');
        setIsShowMessage(false);
        resetForm(initialState, initialState);
    }, []);

    React.useEffect(() => {
        if (isShowMessage) {
            setFormMessage(message);
        }
    }, [message, isShowMessage]);


    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            setIsShowMessage(true);
            onSubmit(values.email, values.password, values.name);
        }
    }

    return (
        <form onSubmit={handleSubmit} name={`form-${name}`} className="form" noValidate>

            {isRegister && <label className="form__label">Имя
                <input className={`form__input ${errors.name && "form__input-error-text"}`} readOnly={isLoading} disabled={isLoading} id="name" value={values.name} onChange={handleChange} name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" required />
                <span className="form__input-error">{errors.name}</span>
            </label>}

            <label className="form__label">E-mail
                <input className={`form__input ${errors.email && "form__input-error-text"}`} readOnly={isLoading} disabled={isLoading} id="email" value={values.email} onChange={handleChange} name="email" type="email" placeholder="Email" minLength="2" maxLength="40" required />
                <span className="form__input-error">{errors.email}</span>
            </label>

            <label className="form__label">Пароль
                <input className={`form__input ${errors.password && "form__input-error-text"}`} readOnly={isLoading} disabled={isLoading} id="password" value={values.password} onChange={handleChange} name="password" type="password" placeholder="Пароль" minLength="6" maxLength="200" required />
                <span className="form__input-error">{errors.password}</span>
            </label>
            <span className={`form__message ${!isRegister && "form__message_margin_large"}`}>{formMessage}</span>
            <button className={`form__save-btn ${isValid && "form__save-btn_active"}`} readOnly={isLoading} disabled={isLoading} type="submit">{buttonText}</button>
        </form>
    );
}

export default AuthForm;