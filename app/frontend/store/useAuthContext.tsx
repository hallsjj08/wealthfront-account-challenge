import { useContext } from 'react';
import { AuthContext } from './auth-context-provider';

export function useAuthContext() {
  return useContext(AuthContext);
}
