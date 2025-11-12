import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, SHOW_TOAST, useString } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';
import { API } from '../../api';

export default function ResetPassword(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setLoading] = useState(false);

    async function onResetPassword() {
        if (!email) {
            setEmailError(STRING.please_enter_your_email);
        } else {
            setEmailError('');
            const params = {
                email: email,
            };
            try {
                setLoading(true);
                const result = await API.Instance.post(API.API_ROUTES.resetPassword, params);
                setLoading(false);
                console.log('result', result.status, result)
                if (result.status) {
                    SHOW_TOAST(result?.data?.message ?? '', 'success')
                    props.navigation.navigate(SCREENS.Otp.identifier, {
                        email: email
                    });
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


    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.reset_password}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._939393}
                        style={{ marginBottom: getScaleSize(20) }}>
                        {STRING.enter_your_registered_email_or_phone_number_below_to_get_reset_your_password}
                    </Text>
                    <View style={styles(theme).inputContainer}>
                        <Input
                            placeholder={STRING.enter_email_or_mobile_number}
                            placeholderTextColor={theme._939393}
                            inputTitle={STRING.email_or_mobile_number}
                            inputColor={true}
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
                </View>
            </ScrollView>
            <Button
                title={STRING.continue}
                disabled={!email}
                style={{ marginVertical: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                onPress={() => {
                    onResetPassword();
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
