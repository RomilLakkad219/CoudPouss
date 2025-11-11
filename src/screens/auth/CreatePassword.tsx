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

export default function CreatePassword(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [show, setShow] = useState(true);
    const [confirmShow, setConfirmShow] = useState(true);

    async function onLogin() {
        // if (!password) {
        //     setPasswordError(STRING.please_enter_your_password);
        // } else {
        setPasswordError('');
        props.navigation.navigate(SCREENS.AddPersonalDetails.identifier);
        // }
    }

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.create_password}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._565656}
                        style={{ marginBottom: getScaleSize(20) }}>
                        {STRING.create_a_strong_password}
                    </Text>
                    <Input
                        placeholder={STRING.enter_new_password}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.password}
                        inputColor={true}
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
                    <Input
                        placeholder={STRING.re_enter_new_password}
                        placeholderTextColor={theme._939393}
                        inputTitle={STRING.confirm_password}
                        inputColor={true}
                        value={confirmPassword}
                        passwordIcon={true}
                        secureTextEntry={confirmShow}
                        continerStyle={{ marginTop: getScaleSize(16) }}
                        onChnageIcon={() => {
                            setConfirmShow(!confirmShow);
                        }}
                        onChangeText={text => {
                            setConfirmPassword(text);
                            setConfirmPasswordError('');
                        }}
                        isError={confirmPasswordError}
                    />
                </View>
            </ScrollView>
            <Button
                title={STRING.next}
                style={{ marginVertical: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
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
