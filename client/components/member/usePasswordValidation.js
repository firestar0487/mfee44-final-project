// usePasswordValidation.js
import { useState } from 'react';

export function usePasswordValidation() {
  const [password, setPassword] = useState('');
  const [showRules, setShowRules] = useState(false);

  const ruleChecks = {
    minLength: password.length >= 8,
    hasNumber: /\d/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFocus = () => {
    setShowRules(true);
  };

  const handleBlur = () => {
    setShowRules(false);
  };

  return { password, showRules, ruleChecks, handlePasswordChange, handleFocus, handleBlur };
}
