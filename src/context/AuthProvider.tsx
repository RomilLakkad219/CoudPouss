import React, { createContext, useState } from 'react'

interface AuthProviderProps {
    children: any
}

export const AuthContext = createContext<any>(null);

export function AuthProvider(props: Readonly<AuthProviderProps>): any {

    const [user, setUser] = useState<any>(null)

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
        }}>
            {props.children}
        </AuthContext.Provider >
    )
}
