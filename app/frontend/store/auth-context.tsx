import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface User {
    id: number,
    username: string,
    password: string,
}

interface AuthContextProps {
    user?: User,
    isAuthenticated: boolean,
    handleCreateUser: (username: string, password: string) => Promise<Response>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    handleCreateUser: () => Promise.resolve(new Response()),
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
            setIsAuthenticated(true)
        }

        return response;
    }

    async function checkLoginStatus() {
        const response = await fetch('http://localhost:3000/logged_in', {
          credentials: 'include'
        })
      
        const data = await response.json();
        if (response.ok && data.logged_in) {
            setAuthenticatedUser(data.user)
            setIsAuthenticated(true)
        }
    }

    async function logout() {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'DELETE',
            credentials: 'include'
          })
        
          const data = await response.json();
          if (response.ok && !data.logged_in) {
              setAuthenticatedUser(undefined)
              setIsAuthenticated(false)
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

export const useAuth = () => {
    return useContext(AuthContext)
}