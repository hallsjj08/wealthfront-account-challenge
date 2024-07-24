import React from 'react';
import { Input } from 'app/frontend/reusable-components/input/input';
import { Navigate } from 'react-router-dom';
import { Card } from 'app/frontend/reusable-components/card/card';
import { Form } from 'app/frontend/reusable-components/form/form';
import PasswordStrengthScore from './password-strength-score';
import ErrorMessage from 'app/frontend/reusable-components/errors/error-message';
import useCreateAccount from './useCreateAccount';
import { Button } from 'app/frontend/reusable-components/button/button';

export interface UserFormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

export function CreateAccount() {
  const { user, score, errorMessages, handleSubmit, handlePasswordChange } = useCreateAccount();

  if (user === null) return null;

  return (
    <>
      {user ? (
        <Navigate to="/signup/account-selection" />
      ) : (
        <Card maxWidth="max-w-[500px]">
          <Form<UserFormElements> onSubmit={(e) => handleSubmit(e)} method="post" action="/create-account">
            <div className="flex items-center justify-center">
              <img className=" w-12 h-12" src="Wealthfront_Logo.png" />
            </div>
            <h1 className=" my-4 text-3xl font-bold text-center">Create New Account</h1>
            {errorMessages.length !== 0 && (
              <ul>
                {errorMessages.map((message) => (
                  <ErrorMessage>{message}</ErrorMessage>
                ))}
              </ul>
            )}
            <Input
              required
              name="username"
              label="Username"
              type="text"
              pattern=".{10,50}"
              error="Must be 10 to 50 characters."
            />

            <Input
              onHandleChange={handlePasswordChange}
              required
              name="password"
              label="Password"
              type="password"
              pattern="^(?=.*?[a-zA-Z])(?=.*?[0-9]).{20,50}$"
              error="Must be 20 to 50 characters. Must contain one letter. Must contain one number."
              PasswordScore={<PasswordStrengthScore score={score} />}
            />
            <Button type="submit" fullwidth>
              Create Account
            </Button>
          </Form>
        </Card>
      )}
    </>
  );
}
