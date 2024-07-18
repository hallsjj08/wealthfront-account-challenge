import React from "react";
import { FlowLayout } from "app/frontend/reusable-components/flow-layout/flow-layout";
import { Button } from "app/frontend/reusable-components/button/button";
import { Input } from "app/frontend/reusable-components/input/input";
import { Form, redirect } from "react-router-dom";

export async function action({request}: { request: Request }) {
    const formData = await request.formData()
    const data = {
        username: formData.get('username'),
        password: formData.get('password')
    }
    const csrf = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");
    const response = await fetch('http://localhost:3000/api/create-account', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf ?? ''
        },
        body: JSON.stringify(data)
    })

    const responseData = await response.json()
    if (!response.ok) {
        // Handle errors here
    }

    console.log(responseData);

    return redirect('/signup/account-selection',);
}

export function CreateAccount() {
    return (
        <FlowLayout>
            <Form method="post" action="/create-account">
                <h1>Create New Account</h1>
                <img src=''/>
                <Input name="username" label="Username"/>
                <Input name="password" label="Password"/>
                <Button type='submit'>Create Account</Button>
            </Form>
        </FlowLayout>
    )
}