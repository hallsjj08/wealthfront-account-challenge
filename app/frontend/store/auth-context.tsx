import React, { createContext, PropsWithChildren, useEffect } from 'react';
import { User, UserValidationError } from './user.type';
import { useAuth } from './useAuth';

export interface AuthContextProps {
  user?: User | null;
  handleCreateUser: (username: string, password: string) => Promise<UserValidationError[]>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  handleCreateUser: () => Promise.resolve([]),
  logout: () => Promise.resolve(),
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const { user, handleCreateUser, checkLoginStatus, logout } = useAuth();

  const context: AuthContextProps = {
    user,
    handleCreateUser,
    logout,
  };

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}
