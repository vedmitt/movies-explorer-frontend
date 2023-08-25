
import { useState, useCallback } from 'react';

export function useFormAndValidation(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState(inputValues);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const errorMessage = (name === 'name' && value && !value.match(/^([wа-яА-Я-a-zA-Z]+\s)*[wа-яА-Я-a-zA-Z]+$/)) ?
      'Только киррилица, лат. символы, пробел или дефис' :
      e.target.validationMessage;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid, setErrors };
}

