import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';

//CONTEXT
import { AuthContext, ThemeContext, ThemeContextType } from '../../context';

//CONSTANT & ASSETS
import { FONTS, IMAGES } from '../../assets';
import { getScaleSize, useString, SHOW_TOAST } from '../../constant';

//SCREENS
import { SCREENS } from '..';

//COMPONENTS
import { Header, Input, Text, Button } from '../../components';


export default function SelectedPlanDetails(props: any) {

    const STRING = useString();
    const { theme } = useContext<any>(ThemeContext);
    const { setMyPlan, myPlan } = useContext<any>(AuthContext);

    const subscriptionDetails = [
        { title: STRING.earn_money_through_coudPouss_secure_escrow_payments, id: 1 },
        { title: STRING.certified_badge_visible_to_all_clients, id: 2 },
        { title: STRING.includes_1_service_category_1_per_extra_category, id: 3 },
        { title: STRING.subscription_billed_via_Bank_Card_Google_Pay_or_Apple_Pay, id: 4 },
        { title: STRING.profile_reviewed_within_72_hours_by_an_administrator, id: 5 },
    ]
    const nonCertifiedSubscriptionDetails = [
        { title: STRING.non_certified_provider_details, id: 1 },
        { title: STRING.service_or_item_exchanges_only, id: 2 },
        { title: STRING.includes_1_service_category_1_per_extra_category, id: 3 },
        { title: STRING.subscription_billed_via_Bank_Card_Google_Pay_or_Apple_Pay, id: 4 },
        { title: STRING.No_money_transactions_Barter_only, id: 5 },
    ]

    const getSubscriptionDetails = () => {
        if (myPlan === 'professional_certified') {
            return subscriptionDetails;
        } else {
            return nonCertifiedSubscriptionDetails;
        }
    }

    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.selected_plan_details}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text
                        size={getScaleSize(20)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._214C65}
                        style={{ marginBottom: getScaleSize(8) }}>
                        {STRING.start_your_journey_today_first_month_on_Us}
                    </Text>
                    <Text size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._939393}
                        style={{ marginBottom: getScaleSize(18) }}>
                        {STRING.subscription_details_text}
                    </Text>
                    <View style={styles(theme).subscriptionItem}>
                        <View style={[styles(theme).flexView]}>
                            <Text
                                size={getScaleSize(19)}
                                font={FONTS.Lato.Bold}
                                color={theme._214C65}>
                                {myPlan === 'non_certified_provider' ? STRING.non_certified_provider : STRING.professional_certified}
                            </Text>
                            {/* <Image source={IMAGES.ic_check} style={styles(theme).selectedView} /> */}
                        </View>
                        <Text
                            size={getScaleSize(27)}
                            font={FONTS.Lato.ExtraBold}
                            color={theme._214C65}
                            style={{ marginVertical: getScaleSize(8) }}>
                            {'€15.99'}{' '}
                            <Text
                                size={getScaleSize(16)}
                                font={FONTS.Lato.Medium}
                                color={theme._214C65}>
                                {STRING.monthly}
                            </Text>
                        </Text>
                        <View style={styles(theme).divider} />
                        <View style={{ flex: 1.0 }}>
                            {(getSubscriptionDetails()).map((e, index) => {
                                return (
                                    <View key={index} style={styles(theme).itemContainer} >
                                        <Image source={IMAGES.ic_sealCheck} style={styles(theme).itemIcon} />

                                        <View style={{ flex: 1.0 }}>
                                            <Text
                                                size={getScaleSize(16)}
                                                font={FONTS.Lato.SemiBold}
                                                color={theme._424242}>
                                                {e?.title}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                    style={styles(theme).backButton}>
                    <Text
                        size={getScaleSize(19)}
                        font={FONTS.Lato.Bold}
                        color={theme._214C65}
                        align="center">
                        {STRING.back}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: getScaleSize(16) }} />
                <Button
                    title={STRING.subscribe}
                    style={{ flex: 1.0 }}
                    onPress={() => {
                        props.navigation.navigate(SCREENS.PaymentMethod.identifier);
                    }}
                />
            </View>
            <SafeAreaView />
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
        },
        flexView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        selectedView: {
            width: getScaleSize(24),
            height: getScaleSize(24),
            borderRadius: getScaleSize(24),
            borderWidth: 1,
            borderColor: theme._2C6587
        },
        divider: {
            height: 1,
            backgroundColor: theme._F2F3F3,
            marginTop: getScaleSize(14)
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: getScaleSize(14)
        },
        itemIcon: {
            width: getScaleSize(18),
            height: getScaleSize(18),
            marginRight: getScaleSize(16)
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
        }
    });
