import React, { ReactNode, useState } from 'react';
import { Button } from '../button/button';
import ErrorMessage from '../errors/error-message';
import useAuthContext from 'app/frontend/store/useAuthContext';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  const { user, logout } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  function handleLogout() {
    logout().catch((e) => {
      console.error(e);
      setErrorMessage('Unable to log out. Please refresh the page and try again.');
    });
  }

  return (
    <div className="flex-col items-center justify-center">
      {user && (
        <div className=" w-full text-right m-4">
          <Button type="button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
      <div className=" h-full mt-5 max-w-[1000px] mx-auto flex items-center justify-center">
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {children}
      </div>
    </div>
  );
}
