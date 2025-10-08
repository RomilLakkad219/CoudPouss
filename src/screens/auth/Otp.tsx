import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';

//PACKAGES
import OTPTextInput from 'react-native-otp-textinput';

export default function Otp(props: any) {

    const STRING = useString();
    const { isFromSignup } = props.route.params || false;

    const { theme } = useContext<any>(ThemeContext);
    const otpInput = useRef<OTPTextInput>(null);

    const [otp, setOtp] = useState('');

    async function onOtp() {
        if(isFromSignup){
            props.navigation.navigate(SCREENS.CreatePassword.identifier);
        }else{
            props.navigation.navigate(SCREENS.NewPassword.identifier);
        }
    }

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.enter_OTP}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._939393}
                        style={{ marginBottom: getScaleSize(32) }}>
                        {STRING.To_reset_your_password_Please_enter_the_4_Digit_PIN_sent_to_your_Email_or_Phone_Number}
                    </Text>
                    <View style={styles(theme).inputContainer}>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.Medium}
                            color={theme._555555}
                            style={{ marginBottom: getScaleSize(8) }}>
                            {STRING.code}
                        </Text>
                        <OTPTextInput
                            ref={otpInput}
                            inputCount={4}
                            handleTextChange={(val: string) => setOtp(val)}
                            tintColor={theme.primary} // border color when active
                            offTintColor={theme._BFBFBF} // border color when inactive
                            textInputStyle={styles(theme).textInput}
                        />
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity>
                <Text
                    size={getScaleSize(20)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._2C6587}
                    align="center"
                    style={{ marginBottom: getScaleSize(16) }}>
                    {STRING.resend_code}
                </Text>
            </TouchableOpacity>
            <Button
                title={isFromSignup ? STRING.verify_OTP : STRING.continue}
                disabled={!otp}
                style={{ marginBottom: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                onPress={() => {
                    onOtp();
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
            justifyContent: 'center'
        },
        mainContainer: {
            flex: 1.0,
            marginHorizontal: getScaleSize(24),
            marginVertical: getScaleSize(18),
            justifyContent: 'center'
        },
        inputContainer: {
            marginBottom: getScaleSize(16),
        },
        textInput: {
            width: getScaleSize(77),
            height: getScaleSize(54),
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            borderBottomWidth: 1,
            borderColor: theme._BFBFBF,
            fontSize: getScaleSize(16),
            fontFamily: FONTS.Lato.Bold,
            color: theme._31302F,
            backgroundColor: theme.white,
        },
    });
