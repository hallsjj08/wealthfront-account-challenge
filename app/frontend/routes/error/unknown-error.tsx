import React from "react";
import { Link } from "react-router-dom";

interface UnkonwnErrorProps {
    errorText: string
}

export default function UnkonwnError({errorText}: UnkonwnErrorProps) {
    return (
        <div className="space-y-4 text-center">
            <h2 className=" text-xl font-medium">{errorText}</h2>
            <p>An uknown error occurred</p>
            <p className="text-blue-500"><Link to="/">Take me back to the home page</Link></p>
        </div>
    )
}