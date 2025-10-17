import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context'

//CONSTANT & ASSETS
import { getScaleSize, useString } from '../../constant'
import { FONTS, IMAGES } from '../../assets'

//SCREENS
import { SCREENS } from '..'

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';

export default function AccountCreatedSuccessfully(props: any) {

    const { isWithdrawal } = props.route.params;
    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);

    return (
        <View style={styles(theme).container}>
            <Header />
            <Image source={IMAGES.accountSuccessfully} style={styles(theme).successIcon} />
            <Text size={getScaleSize(24)}
                font={FONTS.Lato.Bold}
                color={theme._939393}
                align="center">
                {isWithdrawal ? STRING.withdrawal_completed_successfully : STRING.great_job_Your_account_is_now_created_successfully}
            </Text>
        </View>
    )
}

const styles = (theme: ThemeContextType['theme']) =>
    StyleSheet.create({
        container: {
            flex: 1.0,
            backgroundColor: theme.white,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: getScaleSize(29)
        },
        successIcon: {
            width: Dimensions.get('window').width - getScaleSize(58),
            height: ((Dimensions.get('window').width - getScaleSize(58)) * getScaleSize(333)) / getScaleSize(373),
            marginBottom: getScaleSize(40),
        }
    })