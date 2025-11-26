import React, {createContext, useState, useEffect} from 'react';
import {Storage} from '../constant';
import {upsertUserProfile} from '../services/chat';

interface AuthProviderProps {
  children: any;
}

export const AuthContext = createContext<any>(null);

export function AuthProvider(props: Readonly<AuthProviderProps>): any {
  // const [userType, setUserType] = useState<any>('Elder')

  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState<any>('service_provider');
  //elderly_user , service_provider
  const [myPlan, setMyPlan] = useState<any>(null);
  //professional_certified, non_certified_provider

  // Load user data from storage on app start and sync to Firestore
  useEffect(() => {
    async function loadUserFromStorage() {
      try {
        const storedData = await Storage.get(Storage.USER_DETAILS);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const userData = parsedData?.user;

          if (userData) {
            const fullUserData = {
              ...userData,
              token: parsedData?.token,
              refreshToken: parsedData?.refreshToken,
              tokenType: parsedData?.tokenType,
            };

            setUser(fullUserData);

            if (userData?.role) {
              setUserType(userData.role);
            }

            // Sync user to Firestore
            try {
              await upsertUserProfile({
                user_id: userData?.user_id,
                name: userData?.name,
                email: userData?.email,
                mobile: userData?.mobile,
                role: userData?.role,
                address: userData?.address,
              });
            } catch (firestoreError) {
              console.log(
                'Failed to sync user with Firestore on app start',
                firestoreError,
              );
            }
          }
        }
      } catch (error) {
        console.log('Failed to load user from storage', error);
      }
    }

    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userType,
        setUserType,
        myPlan,
        setMyPlan,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
