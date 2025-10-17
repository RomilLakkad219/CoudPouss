import React, { useContext, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
} from 'react-native';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString } from '../../constant';

//COMPONENTS
import { Text, HomeHeader, SearchComponent, Header, Input, Button, BottomSheet } from '../../components';
import { SCREENS } from '..';


export default function MyProfile(props: any) {

    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);

    const bottomSheetRef = useRef<any>(null);

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');
    const [showCountryCode, setShowCountryCode] = useState(false);


    return (
        <View style={styles(theme).container}>
            <Header
                rightIcon={{ icon: IMAGES.ic_delete_profile, title: STRING.delete_profile }}
                onPress={() => { bottomSheetRef.current.open() }}
                onBack={() => { props.navigation.goBack() }}
                screenName={STRING.my_profile}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles(theme).mainContainer}>
                <View style={styles(theme).profileContainer} />
                <Text
                    size={getScaleSize(16)}
                    font={FONTS.Lato.SemiBold}
                    align="center"
                    color={theme._2C6587}>
                    {STRING.edit_picture_or_avatar}
                </Text>
                <Text
                style={{ marginTop: getScaleSize(22), marginBottom: getScaleSize(12) }}
                    size={getScaleSize(20)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._2B2B2B}>
                    {STRING.personal_information}
                </Text>
                <Input
                    placeholder={STRING.enter_name}
                    placeholderTextColor={theme._939393}
                    inputTitle={STRING.full_name}
                    inputColor={true}
                    value={name}
                    continerStyle={{ marginBottom: getScaleSize(20) }}
                    onChangeText={text => {
                        setName(text);
                        setNameError('');
                    }}
                    isError={nameError}
                />
                <Input
                    placeholder={STRING.enter_email}
                    placeholderTextColor={theme._939393}
                    inputTitle={STRING.e_mail_id}
                    inputColor={true}
                    continerStyle={{ marginBottom: getScaleSize(20) }}
                    value={email}
                    onChangeText={text => {
                        setEmail(text);
                        setEmailError('');
                    }}
                    isError={emailError}
                />
                <Input
                    placeholder={STRING.enter_mobile_number}
                    placeholderTextColor={theme._939393}
                    inputTitle={STRING.mobile_number}
                    inputColor={true}
                    keyboardType="numeric"
                    continerStyle={{ marginBottom: getScaleSize(20) }}
                    value={mobileNumber}
                    maxLength={10}
                    countryCode={'+91'}
                    onPressCountryCode={() => {
                        setShowCountryCode(true);
                    }}
                    onChangeText={text => {
                        setMobileNumber(text);
                        setMobileNumberError('');
                    }}
                    isError={mobileNumberError}
                />
                <Input
                    placeholder={STRING.enter_address}
                    placeholderTextColor={theme._939393}
                    inputTitle={STRING.address}
                    inputColor={true}
                    value={address}
                    multiline={true}
                    inputContainer={{ maxHeight: getScaleSize(200) }}
                    continerStyle={{ marginBottom: getScaleSize(20) }}
                    onChangeText={text => {
                        setAddress(text);
                        setAddressError('');
                    }}
                    isError={addressError}
                />
            </View>
            </ScrollView>
            <Button
                title={STRING.update}
                style={{ marginVertical: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                onPress={() => { }}
            />
            <BottomSheet
                bottomSheetRef={bottomSheetRef}
                height={getScaleSize(350)}
                isInfo={true}
                title={STRING.are_you_sure_you_want_to_delete_your_account}
                description={STRING.delete_account_message}
                buttonTitle={STRING.delete_profile}
                onPressButton={() => {

                 }}
            />
            <SafeAreaView />
        </View>
    );
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.white
        },
        mainContainer: {
            flex: 1,
            marginHorizontal: getScaleSize(24),
        },
        profileContainer: {
            width: getScaleSize(126),
            height: getScaleSize(126),
            backgroundColor: theme._F0EFF0,
            borderRadius: getScaleSize(126),
            alignSelf: 'center',
            marginBottom: getScaleSize(12),
        },
    });
