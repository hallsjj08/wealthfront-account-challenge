import React, { FormEvent, useRef, useState } from "react";
import { Button } from "app/frontend/reusable-components/button/button";
import { Input } from "app/frontend/reusable-components/input/input";
import { Navigate } from "react-router-dom";
import { Card } from "app/frontend/reusable-components/card/card";
import { useAuth } from "app/frontend/store/useAuth";
import { Form, FormElement } from "app/frontend/reusable-components/form/form";
import PasswordStrengthScore from "./password-strength-score";
import ErrorMessage from "app/frontend/reusable-components/errors/error-message";

interface UserFormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement,
    password: HTMLInputElement
}

export function CreateAccount() {
    const { user, handleCreateUser } = useAuth();
    const timer = useRef<NodeJS.Timeout | undefined>();
    const [score, setScore] = useState(-1)
    const [errorMessages, setErrorMessages] = useState<string[]>([])

    const handleSubmit = async (e: FormEvent<FormElement<UserFormElements>>) => {
        setErrorMessages([])
        const {username, password} = e.currentTarget.elements
        try {
            const errors = await handleCreateUser(username.value, password.value)
            if (errors.length) {
                setErrorMessages(errors.map(({message}) => message))
            }
        } catch (e) {
            console.error(e);
            setErrorMessages(["Something went wrong while trying to create your account. Please refresh the page and try again."])
        }
    }

    function handlePasswordChange(value: string) {
        if (timer.current) {
            clearTimeout(timer.current)
        }

        if (value.length !== 0) {
            timer.current = setTimeout(async () => {
                try {
                    timer.current = undefined;
                    const response = await fetch('http://localhost:3000/api/password-strength-scores', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({password: value}),
                        credentials: 'include'
                    })
    
                    if (response.ok) {
                        const data = await response.json()
                        setScore(data.score)
                    }
                } catch (e) {
                    console.error("CreateAccount: ", "method: handlePasswordChange", e)
                }
            }, 250)
        } else {
            setScore(-1)
        }
    }

    if (user === null) return null
    
    return (
        <>
        {user ? <Navigate to="/signup/account-selection" /> : (
            <Card maxWidth='max-w-[500px]'>
                <Form<UserFormElements> onSubmit={(e) => handleSubmit(e)} method="post" action="/create-account">
                    <div className="flex items-center justify-center">
                        <img className=" w-12 h-12" src='Wealthfront_Logo.png'/>
                    </div>
                    <h1 className=" my-4 text-3xl font-bold text-center">Create New Account</h1>
                    {errorMessages.length !== 0 && (
                        <ul>
                            {errorMessages.map((message) => <ErrorMessage>{message}</ErrorMessage>)}
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
                        required name="password" 
                        label="Password" 
                        type="password" 
                        pattern="^(?=.*?[a-zA-Z])(?=.*?[0-9]).{20,50}$" 
                        error="Must be 20 to 50 characters. Must contain one letter. Must contain one number." 
                        PasswordScore={<PasswordStrengthScore score={score}/>}
                    />
                    <Button type='submit' fullwidth>Create Account</Button>
                </Form>
            </Card>
        )}
        </>
    )
}