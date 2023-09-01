
import { useState, useCallback } from 'react';

export function useFormAndValidation(inputValues, oldName = '') {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState(inputValues);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let errorMessage = e.target.validationMessage;
    setIsValid(e.target.closest('form').checkValidity());

    if (name === 'name' && value) {
      if (!value.match(/^([wа-яА-Я-a-zA-Z]+\s)*[wа-яА-Я-a-zA-Z]+$/)) {
        errorMessage = 'Только киррилица, лат. символы, пробел или дефис';
        setIsValid(false);
      }
      if (value === oldName) {
        errorMessage = 'Введите новое имя';
        setIsValid(false);
      }
    }

    if (name === 'email' && value) {
      if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        errorMessage = 'Неправильный формат почты';
        setIsValid(false);
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors };
}

