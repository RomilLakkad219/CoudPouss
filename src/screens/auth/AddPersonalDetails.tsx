import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

//CONTEXT
import {AuthContext, ThemeContext, ThemeContextType} from '../../context';

//CONSTANT & ASSETS
import {FONTS, IMAGES} from '../../assets';
import {getScaleSize, useString} from '../../constant';

//SCREENS
import {SCREENS} from '..';

//COMPONENTS
import {Header, Input, Text, Button} from '../../components';
import {CommonActions} from '@react-navigation/native';

export default function AddPersonalDetails(props: any) {
  const STRING = useString();

  const {theme} = useContext<any>(ThemeContext);
  const {userType} = useContext<any>(AuthContext);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState('');

  console.log('userType=====>', userType);

  async function onLogin() {
    if (userType == 'professional') {
      props.navigation.navigate(SCREENS.ChooseYourSubscription.identifier);
    } else {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: SCREENS.BottomBar.identifier}],
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
            style={{marginBottom: getScaleSize(16)}}>
            {STRING.enter_profile_details}
          </Text>
          <Input
            placeholder={STRING.enter_name}
            placeholderTextColor={theme._939393}
            inputTitle={STRING.name}
            inputColor={true}
            continerStyle={{marginBottom: getScaleSize(16)}}
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
            continerStyle={{marginBottom: getScaleSize(16)}}
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
            continerStyle={{marginBottom: getScaleSize(16)}}
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
            continerStyle={{marginBottom: getScaleSize(16)}}
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
          onLogin();
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
