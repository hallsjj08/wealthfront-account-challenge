import React from 'react'
import { Input } from "../input/input";
import { Button } from '../button/button';
import CardContent from '../card/card-content';
import { Form } from '../form/form';

interface CustomerInfoProps {
    to: string
}

interface CustomerInfoFormElements extends HTMLFormControlsCollection {
    firstName: HTMLInputElement,
    lastName: HTMLInputElement,
    email: HTMLInputElement
}

export default function CustomerInfo({to}: CustomerInfoProps) {
    return (
        <CardContent>
            <Form<CustomerInfoFormElements> onSubmit={(e) => console.log(e)} action={to}>
                <Input name="firstName" label="First name" />
                <Input name="lastName" label="Last name" />
                <Input name="email" label="Email" />
                <Button href={to}>Continue</Button>
            </Form>
        </CardContent>
    )
}