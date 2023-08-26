import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import NavMovieTab from "../NavMovieTab/NavMovieTab";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function Profile({ currentUser, onUpdateUser, isMenuOpen, onClosePopup, onOpenPopup, onSignOut, message }) {
    const initialState = { name: '' };
    const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation(initialState, currentUser.name);
    const [isEdit, setIsEdit] = React.useState(false);

    React.useEffect(() => {
        resetForm(initialState, initialState);
        setValues({ name: currentUser.name });
    }, [currentUser, isEdit]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onUpdateUser({ name: values.name });
            !message && setIsEdit(false);
        }
    }

    return (
        <>
            <Header><NavMovieTab onMenuClick={onOpenPopup} /></Header>
            <main className="profile">
                <h2 className="profile__title">Привет, {currentUser?.name}!</h2>
                <form onSubmit={handleSubmit} name="form-profile" className="form profile__form" noValidate>
                    <label className="profile__label">Имя
                        <input className={`profile__input ${errors.name && "form__input-error-text"}`} readOnly={!isEdit} disabled={!isEdit} id="name" value={values.name} onChange={handleChange} name="name" type="text" placeholder="" minLength="2" maxLength="40" required />
                    </label>
                    <span className="profile__input-error">{errors.name}</span>

                    <label className="profile__label">E-mail
                        <input className={`profile__input ${errors.email && "form__input-error-text"}`} readOnly={true} disabled={true} id="email" value={currentUser.email} onChange={handleChange} name="email" type="email" placeholder="" minLength="2" maxLength="40" required />
                    </label>
                    <span className="profile__input-error">{errors.email}</span>

                    <div className={`profile__buttons ${!isEdit && "profile__buttons_visible"}`}>
                        <button className="profile__btn" onClick={() => setIsEdit(true)} type="button">Редактировать</button>
                        <button className="profile__btn profile__btn_color_red" onClick={onSignOut} type="button">Выйти из аккаунта</button>
                    </div>
                    <div className={`profile__buttons ${isEdit && "profile__buttons_visible"}`}>
                        <span className="profile__message">{message}</span>
                        <button className={`form__save-btn ${isValid && "form__save-btn_active"}`} type="submit">Сохранить</button>
                    </div>
                </form>
            </main>
            <Navigation isOpen={isMenuOpen} onClose={onClosePopup} />
        </>
    );
}

export default Profile;