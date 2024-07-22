import React, { createContext, PropsWithChildren, useEffect, useState } from "react";

interface User {
    id: number,
    username: string,
    password: string,
}

interface UserValidationError {
    type: string,
    field: string,
    message: string
}

interface AuthContextProps {
    user?: User,
    isAuthenticated: boolean,
    handleCreateUser: (username: string, password: string) => Promise<UserValidationError[]>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    handleCreateUser: () => Promise.resolve([]),
    logout: () => Promise.resolve()
})

export default function AuthContextProvider({children}: PropsWithChildren) {
    const [user, setAuthenticatedUser] = useState<User | undefined>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    async function handleCreateUser(username: string, password: string) {
        const data = { 
            user: {
                username,
                password
            }
        }
    
        const response = await fetch('http://localhost:3000/api/create-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        const responseData = await response.json()
        if (response.ok) {
            setAuthenticatedUser(responseData.user);
            setIsAuthenticated(true);
            return Promise.resolve<UserValidationError[]>([]);
        } else if (response.status === 422) {
            return Promise.resolve<UserValidationError[]>(responseData.errors.map((error: string) => JSON.parse(error)))
        } else {
            throw response
        }
    }

    async function checkLoginStatus() {
        const response = await fetch('http://localhost:3000/api/logged-in', {
          credentials: 'include'
        })
      
        const data = await response.json();
        if (response.ok && data.logged_in) {
            setAuthenticatedUser(data.user)
            setIsAuthenticated(true)
        } else if (!response.ok){
            console.error("CreateAccount: ", "method: checkLoginStatus", response, data)
        }
    }

    async function logout() {
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'DELETE',
            credentials: 'include'
          })
        
          const data = await response.json();
          if (response.ok && !data.logged_in) {
              setAuthenticatedUser(undefined)
              setIsAuthenticated(false)
          } else if (!response.ok) {
            throw Promise.resolve(response);
          }
    }

    const context: AuthContextProps = {
        user,
        isAuthenticated,
        handleCreateUser,
        logout
    }

    useEffect(() => {
        checkLoginStatus()
    }, [])

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}