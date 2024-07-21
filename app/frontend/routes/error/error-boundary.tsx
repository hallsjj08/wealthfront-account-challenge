import React from "react";
import { useRouteError } from "react-router-dom";
import NotFoundError from "./not-found-error";
import UnauthorizedError from "./unauthorized-error";
import UnkonwnError from "./unknown-error";

interface RouteError {
    status: number,
    statusText: string
}

export default function ErrorBoundary() {
    const {status, statusText} = useRouteError() as RouteError
    
    return (
        <div className="h-screen flex items-center justify-center">
            <div>
                <h1 className="text-5xl font-bold text-center">Error {status}</h1>
                {status === 401 ? <UnauthorizedError/> : 
                status === 404 ? <NotFoundError/> : 
                <UnkonwnError errorText={statusText}/>}
            </div>
        </div>
    )
}