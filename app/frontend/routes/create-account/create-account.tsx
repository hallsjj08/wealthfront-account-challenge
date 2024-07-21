import React, { FormEvent } from "react";
import { Button } from "app/frontend/reusable-components/button/button";
import { Input } from "app/frontend/reusable-components/input/input";
import { Navigate } from "react-router-dom";
import { Card } from "app/frontend/reusable-components/card/card";
import { useAuth } from "app/frontend/store/useAuth";
import { Form, FormElement } from "app/frontend/reusable-components/form/form";

interface UserFormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement,
    password: HTMLInputElement
}

export function CreateAccount() {
    const { isAuthenticated, handleCreateUser } = useAuth();

    const handleSubmit = async (e: FormEvent<FormElement<UserFormElements>>) => {
        const {username, password} = e.currentTarget.elements
        const response = await handleCreateUser(username.value, password.value)
        if (!response.ok) {
            // handle errors
        }
    }
    
    return (
        <>
        {isAuthenticated && <Navigate to="/signup/account-selection" />}
        {!isAuthenticated && (
            <Card maxWidth='max-w-[500px]'>
                <Form<UserFormElements> onSubmit={(e) => handleSubmit(e)} method="post" action="/create-account">
                    <div className="flex items-center justify-center">
                        <img className=" w-12 h-12" src='Wealthfront_Logo.png'/>
                    </div>
                    <h1 className=" my-4 text-3xl font-bold text-center">Create New Account</h1>
                    <Input required name="username" label="Username" type="text" pattern="[0-9a-zA-Z]{10,50}" error="Must be between 10 and 50 characters (inclusive)."/>
                    <Input required name="password" label="Password" type="password" pattern="[0-9a-zA-Z]{20,50}" error="Must be between 20 and 50 characters (inclusive) and contain one letter and one number."/>
                    <Button type='submit' fullwidth>Create Account</Button>
                </Form>
            </Card>
        )}
        </>
    )
}