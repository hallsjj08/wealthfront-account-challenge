import React, { FormEvent } from "react";
import { Button } from "app/frontend/reusable-components/button/button";
import { Input } from "app/frontend/reusable-components/input/input";
import { Form, Navigate } from "react-router-dom";
import { Card } from "app/frontend/reusable-components/card/card";
import { useAuth } from "app/frontend/store/useAuth";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement,
    password: HTMLInputElement
}

interface UserForm extends HTMLFormElement {
    elements: FormElements
}

export function CreateAccount() {
    const { isAuthenticated, handleCreateUser } = useAuth();

    const handleSubmit = async (e: FormEvent<UserForm>) => {
        e.preventDefault()
        const {username, password} = e.currentTarget.elements
        const response = await handleCreateUser(username.value, password.value)
        if (!response.ok) {
            // handle errors
        }
    }

    if (isAuthenticated) return <Navigate to="/signup/account-selection" />
    
    return (
        <Card title="Create New Account">
            <Form onSubmit={(e: FormEvent<UserForm>) => handleSubmit(e)} method="post" action="/create-account">
                <h1>Create New Account</h1>
                <img src=''/>
                <Input name="username" label="Username"/>
                <Input name="password" label="Password"/>
                <Button type='submit'>Create Account</Button>
            </Form>
        </Card>
    )
}