// useEmailValidation.js
import { useState } from 'react';

export function useEmailValidation() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [isEmailMatch, setIsEmailMatch] = useState(true);

  const handleEmailChange = (emailInput) => {
    setEmail(emailInput);
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    setEmailValid(regex.test(emailInput));
  };

  const handleConfirmEmailChange = (confirmEmailInput) => {
    setConfirmEmail(confirmEmailInput);
    setIsEmailMatch(email === confirmEmailInput);
  };

  return {
    email,
    confirmEmail,
    emailValid,
    isEmailMatch,
    handleEmailChange,
    handleConfirmEmailChange,
  };
}
