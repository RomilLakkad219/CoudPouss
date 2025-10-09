import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString, SHOW_TOAST } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';


export default function PaymentMethod(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);

    const paymentMethods = [
        { id: 1, title: 'Google Pay', icon: IMAGES.ic_google_pay },
        { id: 2, title: 'Apple Pay', icon: IMAGES.ic_apple_pay },
        { id: 3, title: 'Credit Card', icon: IMAGES.ic_credit_card },
    ]


    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.payment_method}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._939393}
                        style={{ marginBottom: getScaleSize(16) }}>
                        {STRING.select_a_quick_and_secure_way_to_complete_your_subscription}
                    </Text>
                    <View style={styles(theme).subscriptionItem}>
                        <View style={[styles(theme).flexView, { marginBottom: getScaleSize(18) }]}>
                            <Text
                                size={getScaleSize(19)}
                                font={FONTS.Lato.Bold}
                                color={theme._214C65}>
                                {STRING.professional_certified}
                            </Text>
                            <Image source={IMAGES.ic_check} style={styles(theme).selectedView} />
                        </View>
                        <Text
                            size={getScaleSize(18)}
                            font={FONTS.Lato.Medium}
                            color={theme._214C65}>
                            {STRING.monthly}
                        </Text>
                        <Text
                            size={getScaleSize(19)}
                            font={FONTS.Lato.Bold}
                            color={theme._214C65}
                            style={{ marginVertical: getScaleSize(8) }}>
                            {'€15.99'}
                        </Text>
                        <Text
                            size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            color={theme._214C65}>
                            {STRING.billed_recurring_monthly_cancel_anytime}
                        </Text>
                    </View>
                    <Text
                        size={getScaleSize(17)}
                        font={FONTS.Lato.Medium}
                        color={theme._424242}>
                        {STRING.choose_payment_method}
                    </Text>
                    <View style={styles(theme).paymentMethodContainer}>
                        {paymentMethods.map((e, index) => {
                            return (
                                <TouchableOpacity 
                                key={index} 
                                onPress={() => {
                                    
                                }}
                                style={styles(theme).itemContainer}>
                                    <Image source={e.icon} style={styles(theme).itemIcon} />
                                    <Text
                                        style={{ flex: 1.0 }}
                                        size={getScaleSize(18)}
                                        font={FONTS.Lato.SemiBold}
                                        color={theme._424242}>
                                        {e.title}
                                    </Text>
                                    <Image source={IMAGES.ic_right} style={[styles(theme).selectedView, {marginRight: getScaleSize(12)}]} />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                    }
                    } style={styles(theme).backButton}>
                    <Text
                        size={getScaleSize(19)}
                        font={FONTS.Lato.Bold}
                        color={theme._214C65}
                        align="center">
                        {STRING.cancel}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: getScaleSize(16) }} />
                <Button
                    title={STRING.proceed_to_pay}
                    style={{ flex: 1.0 }}
                    onPress={() => {
                        props.navigation.navigate(SCREENS.SubscriptionSuccessful.identifier);
                    }}
                />
            </View>
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
            marginVertical: getScaleSize(14),
            justifyContent: 'center'
        },
        subscriptionItem: {
            borderColor: theme._CCCCCC66,
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            paddingVertical: getScaleSize(24),
            paddingHorizontal: getScaleSize(20),
            marginBottom: getScaleSize(20),
            backgroundColor: theme._EAF0F370
        },
        flexView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        selectedView: {
            width: getScaleSize(24),
            height: getScaleSize(24),
        },
        buttonContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: getScaleSize(24),
            marginBottom: getScaleSize(24)
        },
        backButton: {
            flex: 1.0,
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            borderColor: theme._214C65,
            paddingVertical: getScaleSize(18),
            alignItems: 'center',
            justifyContent: 'center',
        },
        paymentMethodContainer:{
            marginTop: getScaleSize(20)
        },
        itemContainer:{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: getScaleSize(16),
            borderWidth: 0.5,
            borderColor: theme._DFE8ED,
            borderRadius: getScaleSize(16),
            paddingVertical: getScaleSize(8),
            paddingHorizontal: getScaleSize(12),
        },
        itemIcon:{
            width: getScaleSize(60),
            height: getScaleSize(60),
            marginRight: getScaleSize(15)
        }
    });
