import { FormElement } from 'app/frontend/reusable-components/form/form';
import { useAuthContext } from '../../store/useAuthContext';
import { FormEvent, useRef, useState } from 'react';
import { UserFormElements } from './create-account';

const useCreateAccount = () => {
  const { user, handleCreateUser } = useAuthContext();
  const timer = useRef<NodeJS.Timeout | undefined>();
  const [score, setScore] = useState(-1);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<FormElement<UserFormElements>>) => {
    setErrorMessages([]);
    const { username, password } = e.currentTarget.elements;
    try {
      const errors = await handleCreateUser(username.value, password.value);
      if (errors.length) {
        setErrorMessages(errors.map(({ message }) => message));
      }
    } catch (e) {
      console.log('useCreateAccount', 'method: handleSubmit', e);
      setErrorMessages([
        'Something went wrong while trying to create your account. Please refresh the page and try again.',
      ]);
    }
  };

  function handlePasswordChange(value: string) {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (value.length !== 0) {
      timer.current = setTimeout(async () => {
        try {
          timer.current = undefined;
          const response = await fetch('http://localhost:3000/api/password-strength-scores', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: value }),
            credentials: 'include',
          });

          if (response.ok) {
            const data = await response.json();
            setScore(data.score);
          }
        } catch (e) {
          console.log('CreateAccount: ', 'method: handlePasswordChange', e);
        }
      }, 250);
    } else {
      setScore(-1);
    }
  }

  return {
    user,
    score,
    errorMessages,
    handleSubmit,
    handlePasswordChange,
  };
};

export default useCreateAccount;
