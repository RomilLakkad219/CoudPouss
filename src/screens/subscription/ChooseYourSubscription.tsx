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


export default function ChooseYourSubscription(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);

    const [selectedPlan, setSelectedPlan] = useState('');


    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.choose_your_subscription}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <View style={styles(theme).subscriptionContainer}>
                        <Text size={getScaleSize(18)}
                            font={FONTS.Lato.SemiBold}
                            color={theme._939393}
                            style={{ marginBottom: getScaleSize(16) }}>
                            {STRING.select_the_plan_that_fits_your_activity_You_can_change_it_later_in_your_profile}
                        </Text>
                        <Text
                            size={getScaleSize(19)}
                            font={FONTS.Lato.Medium}
                            color={theme._214C65}
                            style={{ marginBottom: getScaleSize(12) }}>
                            {STRING.all_premium_plans}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedPlan('professional_certified');
                            }}
                            style={styles(theme).subscriptionItem}>
                            <View style={[styles(theme).flexView, { marginBottom: getScaleSize(18) }]}>
                                <Text
                                    size={getScaleSize(19)}
                                    font={FONTS.Lato.Bold}
                                    color={theme._214C65}>
                                    {STRING.professional_certified}
                                </Text>
                                <View>
                                    {selectedPlan === 'professional_certified' ?
                                        <Image source={IMAGES.ic_check} style={styles(theme).selectedView} />
                                        :
                                        <View style={styles(theme).selectedView} />
                                    }
                                </View>
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
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedPlan('non_certified_provider');
                            }}
                            style={styles(theme).subscriptionItem}>
                            <View style={[styles(theme).flexView, { marginBottom: getScaleSize(18) }]}>
                                <Text
                                    size={getScaleSize(19)}
                                    font={FONTS.Lato.Bold}
                                    color={theme._214C65}>
                                    {STRING.non_certified_provider}
                                </Text>
                                <View>
                                    {selectedPlan === 'non_certified_provider' ?
                                        <Image source={IMAGES.ic_check} style={styles(theme).selectedView} />
                                        :
                                        <View style={styles(theme).selectedView} />
                                    }
                                </View>
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
                        </TouchableOpacity>
                        <Text
                            size={getScaleSize(11)}
                            font={FONTS.Lato.Regular}
                            color={theme._2C6587}
                            lineHeight={getScaleSize(16)}>
                            {STRING.subscribe_text}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity>
                <Text
                    size={getScaleSize(14)}
                    font={FONTS.Lato.SemiBold}
                    color={theme._2C6587}
                    align="center"
                    style={{ marginBottom: getScaleSize(16) }}>
                    {STRING.skip}
                </Text>
            </TouchableOpacity>
            <Button
                title={STRING.subscribe}
                style={{ marginBottom: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                onPress={() => {
                    if (!selectedPlan) {
                        SHOW_TOAST(STRING.please_select_a_plan, 'error');
                    } else {
                        props.navigation.navigate(SCREENS.SelectedPlanDetails.identifier);
                    }
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
            marginVertical: getScaleSize(14),
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
        subscriptionContainer: {
            marginBottom: getScaleSize(16)
        },
        subscriptionItem: {
            borderColor: theme._CCCCCC66,
            borderWidth: 1,
            borderRadius: getScaleSize(12),
            paddingVertical: getScaleSize(24),
            paddingHorizontal: getScaleSize(20),
            marginBottom: getScaleSize(20)
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
        }
    });
