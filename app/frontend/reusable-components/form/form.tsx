import React, { FormEvent, ReactNode } from "react";
import { Form as ReactRouterForm } from "react-router-dom";

export interface FormElement<K extends HTMLFormControlsCollection> extends HTMLFormElement {
    elements: K
}

interface FormProps<T extends HTMLFormControlsCollection> {
    onSubmit: (e: FormEvent<FormElement<T>>) => void;
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    action: string
    children: ReactNode;
}

export function Form<K extends HTMLFormControlsCollection>({onSubmit, method = 'get', action, children}: FormProps<K>) {
    function handleOnSubmit(e: FormEvent<FormElement<K>>) {
        e.preventDefault()
        onSubmit(e)
    }

    return (
        <ReactRouterForm method={method} action={action} onSubmit={(e: FormEvent<FormElement<K>>) => handleOnSubmit(e)}>
            {children}
        </ReactRouterForm>
    )
}