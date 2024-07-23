import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundError() {
  return (
    <div className="space-y-4 text-center">
      <h2 className=" text-xl font-medium">Oops, we could not find the page you were looking for.</h2>
      <p>The page may have been moved or may no longer exist.</p>
      <p className="text-blue-500">
        <Link to="/">Take me back to the home page</Link>
      </p>
    </div>
  );
}
