import React from "react";
import { Link } from "react-router-dom";

export default function UnauthorizedError() {
    return (
        <div className="space-y-4 text-center">
            <h2 className=" text-xl font-medium">Unauthorized</h2>
            <p>You do not have access to view this content.</p>
            <p className="text-blue-500"><Link to="/create-account">Please create an account</Link></p>
        </div>
    )
}