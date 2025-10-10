import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//CONTEXT
import {ThemeContext, ThemeContextType} from '../../context';

//CONSTANT & ASSETS
import {FONTS, IMAGES} from '../../assets';
import {getScaleSize, useString} from '../../constant';

//SCREENS
import {SCREENS} from '..';

//COMPONENTS
import {Header, Input, Text, Button} from '../../components';

export default function Login(props: any) {

 const STRING = useString();

  const {theme} = useContext<any>(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  async function onLogin() {
    if (!email) {
      setEmailError(STRING.please_enter_your_email);
    } else if (!password) {
      setPasswordError(STRING.please_enter_your_password);
    } else {
      setEmailError('');
      setPasswordError('');
      console.log('Login');
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
            title="Log In"
            style={{marginTop: getScaleSize(8), marginBottom: getScaleSize(24)}}
            onPress={() => {
              onLogin();
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
              props.navigation.navigate(SCREENS.ChooseYourSubscription.identifier);
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
      justifyContent:'center'
    },
    mainContainer: {
      flex: 1.0,
      marginHorizontal: getScaleSize(24),
      marginVertical: getScaleSize(24),
      justifyContent:'center'
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
