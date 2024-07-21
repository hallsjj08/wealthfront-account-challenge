import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
    const routeError = useRouteError()

    console.log(routeError)

    return (
        <h1>Something went wrong</h1>
    )
}