import React, { createContext, useState } from 'react'

interface AuthProviderProps {
    children: any
}

export const AuthContext = createContext<any>(null);

export function AuthProvider(props: Readonly<AuthProviderProps>): any {

    const [user, setUser] = useState<any>(null)
    const [userType, setUserType] = useState<any>('service_provider')
    //elderly_user , service_provider
    const [myPlan, setMyPlan] = useState<any>(null)
    //professional_certified, non_certified_provider   


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
