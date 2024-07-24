import { useCallback, useState } from 'react';
import { LoginStatus, User, UserResponse, UserValidationError } from './user.type';

function parseResponse<K>(json: unknown): K | undefined {
  let data: K | undefined;
  try {
    if (json !== undefined && json != null && typeof json === 'string') data = JSON.parse(json.toString());
  } catch (e) {
    console.log('Error unmarshalling data.', e, json);
    throw e;
  }
  return data;
}

export const useAuth = () => {
  const [user, setAuthenticatedUser] = useState<User | undefined | null>(null);

  async function handleCreateUser(username: string, password: string) {
    try {
      const requestData = {
        user: {
          username,
          password,
        },
      };

      const response = await fetch('http://localhost:3000/api/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        credentials: 'include',
      });

      const json = await response.json();
      if (response.ok) {
        const data = json as UserResponse;
        if (data && data.logged_in && data.user) {
          setAuthenticatedUser({ ...data.user });
        }
        return Promise.resolve<UserValidationError[]>([]);
      } else if (response.status === 422 && json.errors) {
        return Promise.resolve<UserValidationError[]>(
          // This is return from the server as a JSON string, so it needs to be parsed.
          json?.errors.map((error: unknown) => parseResponse<UserValidationError>(error)) ?? []
        );
      } else {
        throw response;
      }
    } catch (e) {
      // send error to remote logs
      console.log('userAuth', 'method: handleCreateUser', 'Error attempting to create user', e);
      throw e;
    }
  }

  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/logged-in', {
        credentials: 'include',
      });

      const json = await response.json();
      if (response.ok) {
        const data = json as UserResponse;
        data?.logged_in && data?.user ? setAuthenticatedUser({ ...data.user }) : setAuthenticatedUser(undefined);
      } else {
        throw response;
      }
    } catch (e) {
      console.log('useAuth:', 'method: checkLoginStatus', e);
      setAuthenticatedUser(undefined);
    }
  }, []);

  async function logout() {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'DELETE',
        credentials: 'include',
      });

      const json = await response.json();
      const data = json as LoginStatus;
      if (response.ok && data && !data.logged_in) {
        setAuthenticatedUser(undefined);
      } else {
        throw response;
      }
    } catch (e) {
      console.log('useAuth:', 'method: logout', e);
      throw e;
    }
  }

  return {
    user,
    handleCreateUser,
    checkLoginStatus,
    logout,
  };
};
