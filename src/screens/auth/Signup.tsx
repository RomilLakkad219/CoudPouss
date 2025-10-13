import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';

export default function Signup(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);
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
                        style={{ marginBottom: getScaleSize(24) }}>
                        {STRING.get_started_now}
                    </Text>
                    <Text
                        size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._737373}
                        align="center"
                        style={{ marginHorizontal: getScaleSize(48) }}>
                        {STRING.Empowering_seniors_with_easy_access_to_trusted_help_care_and_companionship_whenever_needed}
                    </Text>
                    <Input
                        placeholder={STRING.enter_email_or_mobile_number}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.email_or_mobile_number}
                        inputColor={false}
                        continerStyle={{ marginTop: getScaleSize(82) }}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onChangeText={text => {
                            setEmail(text);
                            setEmailError('');
                        }}
                        isError={emailError}
                    />
                    <Button
                        title={STRING.continue}
                        style={{ marginTop: getScaleSize(32) }}
                        onPress={() => {
                            props.navigation.navigate(SCREENS.Otp.identifier,{
                                isFromSignup: true
                            });
                        }}
                    />
                    <Text
                        size={getScaleSize(20)}
                        font={FONTS.Lato.Regular}
                        color={theme._999999}
                        align="center"
                        style={{ marginTop: getScaleSize(30) }}>
                        {STRING.already_have_an_account}{' '}
                        <Text
                            size={getScaleSize(20)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._2C6587}
                            onPress={() => {
                                props.navigation.navigate(SCREENS.Login.identifier);
                            }}>
                            {STRING.log_in}
                        </Text>
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
            justifyContent: 'center'
        },
        mainContainer: {
            flex: 1.0,
            marginHorizontal: getScaleSize(24),
            marginTop: getScaleSize(30),
            justifyContent: 'center'
        },
        logo: {
            width: Dimensions.get('window').width - getScaleSize(240),
            height: Dimensions.get('window').width - getScaleSize(240),
            alignSelf: 'center',
            marginBottom: getScaleSize(27),
        },

    });
