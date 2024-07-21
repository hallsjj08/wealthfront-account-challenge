import React from 'react'
import { Input } from "../input/input";
import { Button } from '../button/button';
import CardContent from '../card/card-content';

interface CustomerInfoProps {
    to: string
}

export default function CustomerInfo({to}: CustomerInfoProps) {
    return (
        <CardContent>
          <Input name="firstName" label="First name" />
          <Input name="lastName" label="Last name" />
          <Input name="email" label="Email" />
          <Button href={to}>Continue</Button>
        </CardContent>
    )
}