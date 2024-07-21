import React, { ReactNode } from 'react';
import { Button } from '../button/button';
import { useAuth } from 'app/frontend/store/useAuth';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  const {isAuthenticated, logout} = useAuth();
  return (
    <div className="h-full mt-5 max-w-[1000px] mx-auto">
      {isAuthenticated && (
        <div className="w-full text-right">
          <Button type='button' onClick={logout}>Logout</Button>
        </div>
      )}
      {children}
    </div>
  );
}
