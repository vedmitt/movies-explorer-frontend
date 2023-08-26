import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./SearchForm.css";

function SearchForm({ savedKeyword, onSubmit }) {
    const initialState = { keyword: '' };
    const { values, handleChange, errors, isValid, setValues, setErrors, resetForm } = useFormAndValidation(initialState);

    React.useEffect(() => {
        setValues({keyword: savedKeyword});
    }, [savedKeyword]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onSubmit(values.keyword);
        }
        else {
            setErrors({ keyword: "Нужно ввести ключевое слово" });
        }
    }

    return (
        <form onSubmit={handleSubmit} name="form-movie-search" className="search-form" noValidate>
            <button className="search-form__icon"></button>
            <input id="keyword" value={values.keyword} onChange={handleChange} name="keyword" type="text" className="search-form__input" placeholder="Фильм" minLength="1" maxLength="40" required />
            <span className="form__input-error">{errors.keyword}</span>
            <button className="search-form__button" type="submit"></button>
        </form>
    );
}

export default SearchForm;
