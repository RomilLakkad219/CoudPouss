import React, { createContext, useState } from 'react'

interface AuthProviderProps {
    children: any
}

export const AuthContext = createContext<any>(null);

export function AuthProvider(props: Readonly<AuthProviderProps>): any {

    const [user, setUser] = useState<any>(null)
    const [userType, setUserType] = useState<any>(null)
        //Elder , Professional
    const [myPlan, setMyPlan] = useState<any>(null)
    //professional_certified, non_certified_provider   

    //Elder , Professional

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            userType,
            setUserType,
            myPlan,
            setMyPlan
        }}>
            {props.children}
        </AuthContext.Provider >
    )
}
