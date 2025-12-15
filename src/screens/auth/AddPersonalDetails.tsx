import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';
import { CommonActions } from '@react-navigation/native';
import { API } from '../../api';
import { upsertUserProfile } from '../../services/chat';
import { Storage } from '../../constant';

export default function AddPersonalDetails(props: any) {
  const STRING = useString();

  const { theme } = useContext<any>(ThemeContext);
  const { userType, setUser, setUserType } = useContext<any>(AuthContext);
  const isEmail = props?.route?.params?.email || '';

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(isEmail);
  }, [isEmail]);

  async function onSignup() {
    if (!name) {
      setNameError(STRING.please_enter_your_name);
    } else if (!mobileNo) {
      setMobileNoError(STRING.please_enter_your_mobile_number);
    } else if (!email) {
      setEmailError(STRING.please_enter_your_email);
    } else if (!address) {
      setAddressError(STRING.please_enter_your_address);
    } else {
      setNameError('');
      setMobileNoError('');
      setEmailError('');
      setAddressError('');
     
      const params = {
        mobile: mobileNo,
        name: name,
        email: email,
        address: address,
        role: userType
      };
      try {
        setLoading(true);
        const result = await API.Instance.post(API.API_ROUTES.addPersonalDetails, params);
        setLoading(false);
        console.log('result', result.status, result)
        if (result.status) {
          SHOW_TOAST(result?.data?.message ?? '', 'success')
          
          // If API returns user data, store it and sync to Firestore
          const responseData = result?.data?.data;
          if (responseData?.user_data || responseData?.user_id) {
            const userData = responseData?.user_data || {
              user_id: responseData?.user_id,
              name: name,
              email: email,
              mobile: mobileNo,
              role: userType,
              address: address,
            };

            // Store user session
            const authPayload = {
              token: responseData?.access_token,
              refreshToken: responseData?.refresh_token,
              tokenType: responseData?.token_type || 'bearer',
              accessTokenExpire: responseData?.access_token_expire,
              refreshTokenExpire: responseData?.refresh_token_expire,
              user: userData,
            };

            await Storage.save(Storage.USER_DETAILS, JSON.stringify(authPayload));

            const fullUserData = {
              ...userData,
              token: responseData?.access_token,
              refreshToken: responseData?.refresh_token,
              tokenType: responseData?.token_type || 'bearer',
            };

            setUser(fullUserData);
            setUserType(userType);

            // Sync user to Firestore
            try {
              await upsertUserProfile({
                user_id: userData?.user_id,
                name: userData?.name || name,
                email: userData?.email || email,
                mobile: userData?.mobile || mobileNo,
                role: userData?.role || userType,
                address: userData?.address || address,
              });
            } catch (firestoreError) {
              console.log('Failed to sync user with Firestore after signup', firestoreError);
            }
          }
          
          onNext();
        } else {
          SHOW_TOAST(result?.data?.message ?? '', 'error')
          console.log('error==>', result?.data?.message)
        }
      } catch (error: any) {
        setLoading(false);
        SHOW_TOAST(error?.message ?? '', 'error');
        console.log(error?.message)
      } finally {
        setLoading(false);
      }
    }
  }

  async function onNext() {
    if (userType == 'service_provider') {
      props.navigation.navigate(SCREENS.ChooseYourSubscription.identifier);
    } else {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: SCREENS.BottomBar.identifier }],
        }),
      );
    }
  }

  return (
    <View style={styles(theme).container}>
      <Header
        onBack={() => {
          props.navigation.goBack();
        }}
        screenName={STRING.add_personal_details}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles(theme).mainContainer}>
          <View style={styles(theme).imageContainer}>
            <View style={styles(theme).image}>
              <Text
                size={getScaleSize(24)}
                font={FONTS.Lato.Regular}
                color={theme._262B43E5}>
                {STRING.bc}
              </Text>
            </View>
            <Text
              size={getScaleSize(16)}
              font={FONTS.Lato.SemiBold}
              color={theme._2C6587}
              align="center">
              {STRING.upload_profile_picture}
            </Text>
          </View>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._565656}
            style={{ marginBottom: getScaleSize(16) }}>
            {STRING.enter_profile_details}
          </Text>
          <Input
            placeholder={STRING.enter_name}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.name}
            inputColor={true}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={name}
            onChangeText={text => {
              setName(text);
              setNameError('');
            }}
            isError={nameError}
          />
          <Input
            placeholder={STRING.enter_mobile_no}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.mobile_no}
            inputColor={true}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={mobileNo}
            onChangeText={text => {
              setMobileNo(text);
              setMobileNoError('');
            }}
            isError={mobileNoError}
          />
          <Input
            placeholder={STRING.enter_email}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.email}
            inputColor={true}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={email}
            onChangeText={text => {
              setEmail(text);
              setEmailError('');
            }}
            isError={emailError}
          />
          <Input
            placeholder={STRING.enter_address}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.address}
            inputColor={true}
            continerStyle={{ marginBottom: getScaleSize(16) }}
            value={address}
            onChangeText={text => {
              setAddress(text);
              setAddressError('');
            }}
            isError={addressError}
          />
        </View>
      </ScrollView>
      <Button
        title={STRING.next}
        style={{
          marginVertical: getScaleSize(24),
          marginHorizontal: getScaleSize(24),
        }}
        onPress={() => {
          onSignup();
        }}
      />
    </View>
  );
}

const styles = (theme: ThemeContextType['theme']) =>
  StyleSheet.create({
    container: {
      flex: 1.0,
      backgroundColor: theme.white,
      justifyContent: 'center',
    },
    mainContainer: {
      flex: 1.0,
      marginHorizontal: getScaleSize(24),
      marginVertical: getScaleSize(18),
      justifyContent: 'center',
    },
    imageContainer: {
      alignItems: 'center',
      marginTop: getScaleSize(20),
      marginBottom: getScaleSize(16),
    },
    image: {
      backgroundColor: theme._F0EFF0,
      width: getScaleSize(126),
      height: getScaleSize(126),
      borderRadius: getScaleSize(126),
      marginBottom: getScaleSize(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
