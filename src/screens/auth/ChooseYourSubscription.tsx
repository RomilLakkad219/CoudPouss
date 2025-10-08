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


export default function ChooseYourSubscription(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);


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
                    <Text
                        size={getScaleSize(18)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._939393}
                        style={{ marginBottom: getScaleSize(16) }}>
                        {STRING.select_the_plan_that_fits_your_activity_You_can_change_it_later_in_your_profile}
                    </Text>
                    <View style={styles(theme).subscriptionContainer}>
                        <View style={styles(theme).subscriptionItem}>
                            <View style={styles(theme).flexView}>
                                <Text
                                    size={getScaleSize(19)}
                                    font={FONTS.Lato.Bold}
                                    color={theme._214C65}>
                                    {STRING.professional_certified}
                                </Text>
                            </View>
                        </View>
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
                title={STRING.continue}
                style={{ marginBottom: getScaleSize(24), marginHorizontal: getScaleSize(24) }}
                onPress={() => {
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
            paddingHorizontal: getScaleSize(20)
        },
        flexView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }
    });
