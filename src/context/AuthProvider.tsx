import React, {createContext, useState, useEffect} from 'react';
import {Storage} from '../constant';
import {upsertUserProfile} from '../services/chat';
import {API} from '../api';

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
  const [profile, setProfile] = useState<any>(null);
  const [selectedServices, setSelectedServices] = useState<any>([]);
  //professional_certified, non_certified_provider

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const result = await API.Instance.get(API.API_ROUTES.getUserDetails);

      console.log('PROFILE', JSON.stringify(result));
      if (result.status) {
        const userDetail = result?.data?.data?.user;
        setProfile(userDetail);
        return userDetail;
      }
      return null;
    } catch (error: any) {
      return null;
    }
  }
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
        profile,
        setProfile,
        fetchProfile,
        selectedServices,
        setSelectedServices,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
