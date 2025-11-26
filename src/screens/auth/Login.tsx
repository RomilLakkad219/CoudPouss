import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';

//CONTEXT
import {ThemeContext, ThemeContextType, AuthContext} from '../../context';

//CONSTANT & ASSETS
import {FONTS, IMAGES} from '../../assets';
import {getScaleSize, SHOW_TOAST, Storage, useString} from '../../constant';

//COMPONENTS
import {Header, Input, Text, Button} from '../../components';

//SCREENS
import {SCREENS} from '..';

//PACKAGES
import {CommonActions} from '@react-navigation/native';
import {API} from '../../api';
import {upsertUserProfile} from '../../services/chat';

export default function Login(props: any) {
  const STRING = useString();

  const {theme} = useContext<any>(ThemeContext);
  const {setUser, setUserType} = useContext<any>(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setLoading] = useState(false);

  async function onVerification() {
    if (!email) {
      setEmailError(STRING.please_enter_your_email);
    } else if (!password) {
      setPasswordError(STRING.please_enter_your_password);
    } else {
      setEmailError('');
      setPasswordError('');
      onLogin();
    }
  }

  async function persistUserSession(loginResponse: any) {
    const authPayload = {
      token: loginResponse?.access_token,
      refreshToken: loginResponse?.refresh_token,
      tokenType: loginResponse?.token_type,
      accessTokenExpire: loginResponse?.access_token_expire,
      refreshTokenExpire: loginResponse?.refresh_token_expire,
      user: loginResponse?.user_data,
    };

    await Storage.save(Storage.USER_DETAILS, JSON.stringify(authPayload));

    const userData = {
      ...(loginResponse?.user_data ?? {}),
      token: loginResponse?.access_token,
      refreshToken: loginResponse?.refresh_token,
      tokenType: loginResponse?.token_type,
    };

    setUser(userData);
    const role = loginResponse?.user_data?.role;
    if (role) {
      setUserType(role);
    }

    try {
      await upsertUserProfile({
        user_id: loginResponse?.user_data?.user_id,
        name: loginResponse?.user_data?.name,
        email: loginResponse?.user_data?.email,
        mobile: loginResponse?.user_data?.mobile,
        role: loginResponse?.user_data?.role,
        address: loginResponse?.user_data?.address,
      });
    } catch (firestoreError) {
      console.log('Failed to sync user with Firestore', firestoreError);
    }
  }

  async function onLogin() {
    const params = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const result = await API.Instance.post(API.API_ROUTES.login, params);
      console.log('result', result.status, result);
      if (result.status && result?.data?.data) {
        await persistUserSession(result?.data?.data);
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: SCREENS.BottomBar.identifier}],
          }),
        );
      } else {
        SHOW_TOAST(result?.data?.msg, 'error');
        console.log(result?.data?.msg);
      }
    } catch (error: any) {
      SHOW_TOAST(error?.message ?? '', 'error');
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles(theme).container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles(theme).mainContainer}>
          <Image source={IMAGES.ic_logo} style={styles(theme).logo} />
          <Text
            size={getScaleSize(27)}
            font={FONTS.Lato.ExtraBold}
            color={theme._2C6587}
            align="center"
            style={{marginBottom: getScaleSize(12)}}>
            {STRING.welcome_back}
          </Text>
          <Text
            size={getScaleSize(18)}
            font={FONTS.Lato.SemiBold}
            color={theme._565656}
            align="center"
            style={{marginBottom: getScaleSize(36)}}>
            {STRING.enter_your_email_and_password_to_login}
          </Text>
          <View style={styles(theme).inputContainer}>
            <Input
              placeholder={STRING.enter_email_or_mobile_number}
              placeholderTextColor={theme._939393}
              inputTitle={STRING.email_or_mobile_number}
              inputColor={false}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text);
                setEmailError('');
              }}
              isError={emailError}
            />
          </View>
          <View style={styles(theme).inputContainer}>
            <Input
              placeholder={STRING.enter_password}
              placeholderTextColor={theme._939393}
              inputTitle={STRING.password}
              inputColor={false}
              value={password}
              passwordIcon={true}
              secureTextEntry={show}
              onChnageIcon={() => {
                setShow(!show);
              }}
              onChangeText={text => {
                setPassword(text);
                setPasswordError('');
              }}
              isError={passwordError}
            />
          </View>
          <Button
            title={isLoading ? 'Logging in...' : 'Log In'}
            style={{marginTop: getScaleSize(8), marginBottom: getScaleSize(24)}}
            disabled={isLoading}
            onPress={() => {
              onVerification();
            }}
          />
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.Regular}
            color={theme._999999}
            align="center"
            style={{marginTop: getScaleSize(12)}}>
            {STRING.dont_have_an_account}{' '}
            <Text
              size={getScaleSize(20)}
              font={FONTS.Lato.SemiBold}
              color={theme._2C6587}
              onPress={() => {
                props.navigation.navigate(SCREENS.SignupSelect.identifier);
              }}>
              {STRING.sign_up}
            </Text>
          </Text>
          <Text
            size={getScaleSize(20)}
            font={FONTS.Lato.Regular}
            onPress={() => {
              props.navigation.navigate(SCREENS.ResetPassword.identifier);
            }}
            color={theme._999999}
            align="center"
            style={{marginTop: getScaleSize(24)}}>
            {STRING.forgot_password}
          </Text>
        </View>
      </ScrollView>
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
      marginVertical: getScaleSize(24),
      justifyContent: 'center',
    },
    logo: {
      width: Dimensions.get('window').width - getScaleSize(240),
      height: Dimensions.get('window').width - getScaleSize(240),
      alignSelf: 'center',
      marginBottom: getScaleSize(31),
    },
    inputContainer: {
      marginBottom: getScaleSize(16),
    },
  });
