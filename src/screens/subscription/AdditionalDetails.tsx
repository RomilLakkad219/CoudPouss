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


export default function AdditionalDetails(props: any) {

    const STRING = useString();

    const { theme } = useContext<any>(ThemeContext);


    return (
        <View style={styles(theme).container}>
            <Header
                onBack={() => {
                    props.navigation.goBack();
                }}
                screenName={STRING.additional_details}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles(theme).mainContainer}>
                    <Text size={getScaleSize(16)}
                        font={FONTS.Lato.SemiBold}
                        color={theme._939393}
                        style={{ marginBottom: getScaleSize(32) }}>
                        {STRING.upload_the_required_documents_to_complete_your_profile_and_gain_the_Certified_badge}
                    </Text>
                    <Text size={getScaleSize(17)}
                        font={FONTS.Lato.Medium}
                        color={theme._424242}
                        style={{ marginBottom: getScaleSize(8) }}>
                        {STRING.a_copy_of_ID}
                    </Text>
                    <TouchableOpacity style={styles(theme).itemContainer}>
                        <Image source={IMAGES.ic_file_uplord} style={styles(theme).fileIcon} />
                        <Text size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            color={theme._818285}>
                            {STRING.upload_from_device}
                        </Text>
                    </TouchableOpacity>
                    <Text size={getScaleSize(17)}
                        font={FONTS.Lato.Medium}
                        color={theme._424242}
                        style={{ marginBottom: getScaleSize(8) }}>
                        {STRING.kbis_extract}
                    </Text>
                    <TouchableOpacity style={styles(theme).itemContainer}>
                        <Image source={IMAGES.ic_file_uplord} style={styles(theme).fileIcon} />
                        <Text size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            color={theme._818285}>
                            {STRING.upload_from_device}
                        </Text>
                    </TouchableOpacity>
                    <Text size={getScaleSize(17)}
                        font={FONTS.Lato.Medium}
                        color={theme._424242}
                        style={{ marginBottom: getScaleSize(4) }}>
                        {STRING.proof_of_residence}
                    </Text>
                    <Text size={getScaleSize(12)}
                        font={FONTS.Lato.Regular}
                        color={theme._D32F2F}
                        style={{ marginBottom: getScaleSize(8) }}>
                        {STRING.less_than_3_months_old_e_g_water_or_electricity_bill}
                    </Text>
                    <TouchableOpacity style={styles(theme).itemContainer}>
                        <Image source={IMAGES.ic_file_uplord} style={styles(theme).fileIcon} />
                        <Text size={getScaleSize(12)}
                            font={FONTS.Lato.Regular}
                            color={theme._818285}>
                            {STRING.upload_from_device}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles(theme).buttonContainer}>
                <TouchableOpacity
                    onPress={() => {

                    }} style={styles(theme).backButton}>
                    <Text
                        size={getScaleSize(19)}
                        font={FONTS.Lato.Bold}
                        color={theme._214C65}
                        align="center">
                        {STRING.skip}
                    </Text>
                </TouchableOpacity>
                <View style={{ width: getScaleSize(16) }} />
                <Button
                    title={STRING.next}
                    style={{ flex: 1.0 }}
                    onPress={() => {
                        props.navigation.navigate(SCREENS.YearsOfExperience.identifier);
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
        itemContainer: {
            paddingVertical: getScaleSize(47),
            paddingHorizontal: getScaleSize(20),
           justifyContent: 'center',
            alignItems: 'center',
            marginBottom: getScaleSize(24),
            borderWidth: 1,
            borderColor: theme._818285,
            borderStyle: 'dashed',
            borderRadius: getScaleSize(8),
        },
        fileIcon:{
            width: getScaleSize(24),
            height: getScaleSize(24),
            marginBottom: getScaleSize(8)
        }
    });
