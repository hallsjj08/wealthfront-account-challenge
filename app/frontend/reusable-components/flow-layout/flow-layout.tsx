import { useAuth } from 'app/frontend/store/auth-context';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  const {isAuthenticated} = useAuth();
  return (
    <div className="h-full mt-5 max-w-[1000px] mx-auto">
      {isAuthenticated && (
        <div className="w-full text-right">
          <Link to="/logout" reloadDocument>
            Logout
          </Link>
        </div>
      )}
      {children}
    </div>
  );
}
