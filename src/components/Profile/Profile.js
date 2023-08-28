import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import NavMovieTab from "../NavMovieTab/NavMovieTab";
import Navigation from "../Navigation/Navigation";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { profileEditSuccessMessage } from "../../utils/constants";

function Profile({ currentUser, onUpdateUser, isMenuOpen, onClosePopup, onOpenPopup, onSignOut, message }) {
    const initialState = { name: '' };
    const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation(initialState, currentUser.name);
    const [isEdit, setIsEdit] = React.useState(false);
    const [formMessage, setFormMessage] = React.useState('');
    const [isShowMessage, setIsShowMessage] = React.useState(false);

    React.useEffect(() => {
        setFormMessage('');
        setIsShowMessage(false);
    }, []);
    
    React.useEffect(() => {
        resetForm(initialState, initialState);
        setValues({ name: currentUser.name });
    }, [currentUser]);
    
    React.useEffect(() => {
        if (isShowMessage) {
            setFormMessage(message);
        }
    }, [message, isShowMessage]);

    // при переключении на режим редактирования, сообщение должно пропасть
    React.useEffect(() => {
        if (isEdit) {
            setFormMessage('');
            setIsShowMessage(false);
        }
    }, [isEdit]);


    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            setIsShowMessage(true);
            onUpdateUser({ name: values.name });
            setIsEdit(!message === profileEditSuccessMessage);
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
                    {/* сообщение и кнопка сохранения */}
                    <div className="profile__buttons">
                        <span className={`profile__message ${formMessage === profileEditSuccessMessage && "profile__message_color_green"}`}>
                            {formMessage}
                        </span>
                        <button className={`form__save-btn ${!isEdit && "profile__element_hidden"} ${isValid && "form__save-btn_active"}`} type="submit">
                            Сохранить
                        </button>
                    </div>
                    {/* кнопки редактрования и выхода из аакаунта */}
                    <div className={`profile__buttons ${isEdit && "profile__element_hidden"}`}>
                        <button className="profile__btn" onClick={() => setIsEdit(true)} type="button">
                            Редактировать
                        </button>
                        <button className="profile__btn profile__btn_color_red" onClick={onSignOut} type="button">
                            Выйти из аккаунта
                        </button>
                    </div>
                </form>
            </main>
            <Navigation isOpen={isMenuOpen} onClose={onClosePopup} />
        </>
    );
}

export default Profile;