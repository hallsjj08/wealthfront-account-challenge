import React, { ReactNode } from 'react';
import { Button } from '../button/button';
import { useAuth } from 'app/frontend/store/useAuth';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  const {isAuthenticated, logout} = useAuth();
  return (
    <div className='flex-col items-center justify-center'>
      {isAuthenticated && (
          <div className=" w-full text-right m-4">
            <Button type='button' onClick={logout}>Logout</Button>
          </div>
        )}
      <div className=" h-full mt-5 max-w-[1000px] mx-auto flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
