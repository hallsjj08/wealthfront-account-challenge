import React from "react";
import { FlowLayout } from "app/frontend/reusable-components/flow-layout/flow-layout";
import { Button } from "app/frontend/reusable-components/button/button";
import { Input } from "app/frontend/reusable-components/input/input";


export function CreateAccount() {
    return (
        <FlowLayout>
            <h1>Create New Account</h1>
            <img src=''/>
            <Input label="Username"/>
            <Input label="Password"/>
            <Button href="/signup/create-user">Create Account</Button>
        </FlowLayout>
    )
}